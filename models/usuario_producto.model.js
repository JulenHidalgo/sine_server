const db = require("../config/database");

const ESTADO = Object.freeze({
  RECIBIDO: "Recibido",
  PARA_DEVOLVER: "Para devolver",
  DEVUELTO: "Devuelto",
});

class Usuario_producto {
  constructor(usuario_id, producto_matricula, estado, fecha) {
    this.usuario_id = usuario_id;
    this.producto_matricula = producto_matricula;
    this.estado = estado;
    this.fecha = fecha;
  }

  // Método para mapear un objeto de la base de datos a la clase Usuario_producto
  static fromRow(row) {
    return new Usuario_producto(
      row.usuario_id,
      row.producto_matricula,
      row.estado,
      row.fecha
    );
  }

  // Obtener todas las entradas en usuario_producto
  static obtenerTodos(callback) {
    db.query("SELECT * FROM usuario_producto", (err, results) => {
      if (err) return callback(err, null);
      const usuario_productos = results.map((row) =>
        Usuario_producto.fromRow(row)
      );
      callback(null, usuario_productos);
    });
  }

  // Obtener las entradas de un producto en usuario_producto
  static obtenerPorMatricula(usuario_producto, callback) {
    const sql = "SELECT * FROM usuario_producto where producto_matricula = ?";
    db.query(sql, [usuario_producto.producto_matricula], (err, results) => {
      if (err) return callback(err, null);
      const usuario_productos = results.map((row) =>
        Usuario_producto.fromRow(row)
      );
      callback(null, usuario_productos);
    });
  }

  // Crear un nueva entrada en usuario_producto
  static crear(usuario_producto, callback) {
    const sql =
      "INSERT INTO usuario_producto (usuario_id, producto_matricula, estado, fecha) VALUES (?, ?, ?, ?)";
    db.query(
      sql,
      [
        usuario_producto.usuario_id,
        usuario_producto.producto_matricula,
        usuario_producto.estado,
        usuario_producto.fecha,
      ],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, usuario_producto);
      }
    );
  }
}

module.exports = Usuario_producto;
