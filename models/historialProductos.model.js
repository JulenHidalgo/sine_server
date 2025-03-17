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
    this.matricula = matricula;
    this.nombre_almacen = nombre_almacen;
    this.ot = ot;
    this.descripcion_obra = descripcion_obra;
    this.estado = estado;
    this.empleado1 = empleado1;
    this.fecha1 = fecha1;
    this.empleado2 = empleado2;
    this.fecha2 = fecha2;
    this.empleado3 = empleado3;
    this.fecha3 = fecha3;
    this.observaciones = observaciones;
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

  // ✅ Obtener todo el historial de productos
  static async obtenerTodos() {
    try {
      console.log(
        "🔍 Ejecutando consulta: SELECT * FROM vista_historial_productos"
      );
      const [rows] = await db.query("SELECT * FROM vista_historial_productos");
      console.log("✅ Información obtenida:", rows);
      return rows.map((row) => HistorialProductos.fromRow(row));
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  // ✅ Obtener historial por matrícula
  static async obtenerPorMatricula(matricula) {
    try {
      console.log("🔍 Buscando historial para matrícula:", matricula);

      const sql = "SELECT * FROM vista_historial_productos WHERE matricula = ?";
      const [rows] = await db.query(sql, [matricula]);

      if (rows.length === 0) {
        console.log(
          "❌ No se encontró historial para la matrícula:",
          matricula
        );
        return null; // Indica que no se encontraron registros
      }

      console.log("✅ Historial encontrado:", rows);
      return rows.map((row) => HistorialProductos.fromRow(row));
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }
}

module.exports = HistorialProductos;
