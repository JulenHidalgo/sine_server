const db = require("../config/database");

class HistorialProductos {
  constructor(
    matricula,
    nombre_almacen,
    ot,
    descripcion_obra,
    estado,
    empleado1,
    fecha1,
    empleado2,
    fecha2,
    empleado3,
    fecha3,
    observaciones
  ) {
    (this.matricula = matricula),
      (this.nombre_almacen = nombre_almacen),
      (this.ot = ot),
      (this.descripcion_obra = descripcion_obra),
      (this.estado = estado),
      (this.empleado1 = empleado1),
      (this.fecha1 = fecha1),
      (this.empleado2 = empleado2),
      (this.fecha2 = fecha2),
      (this.empleado3 = empleado3),
      (this.fecha3 = fecha3),
      (this.observaciones = observaciones);
  }

  static fromRow(row) {
    return new HistorialProductos(
      row.matricula,
      row.nombre_almacen,
      row.ot,
      row.descripcion_obra,
      row.estado,
      row.empleado1,
      row.fecha1,
      row.empleado2,
      row.fecha2,
      row.empleado3,
      row.fecha3,
      row.observaciones
    );
  }

  static obtenerTodos(callback) {
    db.query("SELECT * FROM vista_historial_productos", (err, results) => {
      if (err) return callback(err, null);
      const informacion = results.map((row) => HistorialProductos.fromRow(row));
      callback(null, informacion);
    });
  }
}

module.exports = HistorialProductos;
