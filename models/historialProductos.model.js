// Importar la configuración de la base de datos
const db = require("../config/database");

// Definición de la clase HistorialProductos
class HistorialProductos {
  // Constructor para crear una instancia de HistorialProductos
  constructor(
    id,
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
    this.id = id;
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

  // Método para convertir una fila de la base de datos en un objeto HistorialProductos
  static fromRow(row) {
    return new HistorialProductos(
      row.id,
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

  // Método para obtener todo el historial de productos desde la vista
  static async obtenerTodos() {
    try {
      console.log(
        "🔍 Ejecutando consulta: SELECT * FROM vista_historial_productos"
      );
      const [rows] = await db.query("SELECT * FROM vista_historial_productos");
      console.log("✅ Información obtenida:", rows);
      // Mapear cada fila a una instancia de la clase
      return rows.map((row) => HistorialProductos.fromRow(row));
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  // Método para obtener historial de un producto específico por su matrícula
  static async obtenerPorMatricula(matricula) {
    try {
      console.log("🔍 Buscando historial para matrícula:", matricula);

      const sql = "SELECT * FROM vista_historial_productos WHERE matricula = ?";
      const [rows] = await db.query(sql, [matricula]);

      // Si no hay resultados, se retorna null
      if (rows.length === 0) {
        console.log(
          "❌ No se encontró historial para la matrícula:",
          matricula
        );
        return null;
      }

      console.log("✅ Historial encontrado:", rows);
      return rows.map((row) => HistorialProductos.fromRow(row));
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  // Método para obtener historial por ID
  static async obtenerPorId(id) {
    try {
      console.log("🔍 Buscando historial para id:", id);

      const sql = "SELECT * FROM vista_historial_productos WHERE id = ?";
      const [rows] = await db.query(sql, [id]);

      // Si no hay resultados, se retorna null
      if (rows.length === 0) {
        console.log("❌ No se encontró historial para la matrícula:", id);
        return null;
      }

      console.log("✅ Historial encontrado:", rows);
      return rows.map((row) => HistorialProductos.fromRow(row));
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }
}

// Exportar la clase para su uso en otros módulos
module.exports = HistorialProductos;
