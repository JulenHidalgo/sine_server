const db = require("../config/database");

const ESTADO = Object.freeze({
  RECIBIDO: "Recibido",
  PARA_DEVOLVER: "Para devolver",
  DEVUELTO: "Devuelto",
});

class Producto {
  constructor(matricula, observaciones, almacen_id, obra_ot) {
    this.matricula = matricula;
    this.observaciones = observaciones;
    this.almacen_id = almacen_id;
    this.obra_ot = obra_ot;
  }

  // Método para mapear un objeto de la base de datos a la clase Producto
  static fromRow(row) {
    return new Producto(
      row.matricula,
      row.observaciones,
      row.almacen_id,
      row.obra_ot
    );
  }

  // Obtener todos los productos
  static obtenerTodos(callback) {
    db.query("SELECT * FROM producto", (err, results) => {
      if (err) return callback(err, null);
      const productos = results.map((row) => Producto.fromRow(row));
      callback(null, productos);
    });
  }

  // Crear un nuevo usuario
  static crear(obra, callback) {
    const sql =
      "INSERT INTO producto (matricula, observaciones, almacen_id, obra_ot) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [obra.matricula, obra.observaciones, obra.almacen_id, obra.obra_ot],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, obra);
      }
    );
  }

  // Modificar el atributo "observaciones" de un producto
  static modificar(producto, callback) {
    const sql =
      "UPDATE producto SET observaciones = CONCAT(observaciones, ?)  WHERE matricula = ?";
    db.query(
      sql,
      [";" + producto.observaciones, producto.matricula],
      (err, result) => {
        if (err) return callback(err, null);

        // Verificamos si se modificó algún registro
        if (result.affectedRows === 0) {
          return callback(new Error("Producto no encontrado"), null);
        }

        callback(null, producto);
      }
    );
  }
}

module.exports = Producto;
