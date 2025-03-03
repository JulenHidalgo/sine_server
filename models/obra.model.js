const db = require("../config/database");

class Obra {
  constructor(ot, descripcion) {
    this.ot = ot;
    this.descripcion = descripcion;
  }

  // Método para mapear un objeto de la base de datos a la clase Obra
  static fromRow(row) {
    return new Obra(row.ot, row.descripcion);
  }

  // Obtener todas las obras
  static obtenerTodos(callback) {
    db.query("SELECT * FROM obra", (err, results) => {
      if (err) return callback(err, null);
      const obras = results.map((row) => Obra.fromRow(row));
      callback(null, obras);
    });
  }
  // Crear un nueva obra
  static crear(obra, callback) {
    const sql = "INSERT INTO obra (ot, descripcion) VALUES (?, ?)";
    db.query(sql, [obra.ot, obra.descripcion], (err, result) => {
      if (err) return callback(err, null);
      callback(null, obra);
    });
  }
}

module.exports = Obra;
