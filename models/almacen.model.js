const db = require("../config/database");

class Almacen {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  // Método para mapear un objeto de la base de datos a la clase Obra
  static fromRow(row) {
    return new Almacen(row.id, row.nombre);
  }

  // Obtener todos los almacenes
  static obtenerTodos(callback) {
    db.query("SELECT * FROM almacen", (err, results) => {
      if (err) return callback(err, null);
      const almacenes = results.map((row) => Almacen.fromRow(row));
      callback(null, almacenes);
    });
  }
  // Crear un nuevo almacen
  static crear(almacen, callback) {
    const sql = "INSERT INTO almacen (nombre) VALUES (?)";
    db.query(sql, [almacen.nombre], (err, result) => {
      if (err) return callback(err, null);
      almacen.id = result.insertId;
      callback(null, almacen);
    });
  }
}

module.exports = Almacen;
