/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

// Importar la configuración de la base de datos
const db = require("../config/database");

/**
 * Clase que representa el historial de movimientos de productos.
 */
class HistorialProductos {
  /**
   * Crea una instancia de HistorialProductos.
   * @param {number} producto_id - Identificador del historial.
   * @param {string} matricula - Matrícula del producto.
   * @param {string} nombre_almacen - Nombre del almacén.
   * @param {string} ot - Orden de trabajo de la obra.
   * @param {string} descripcion_obra - Descripción de la obra.
   * @param {string} estado - Estado general del producto.
   * @param {string} empleado1 - Primer usuario que interactuó con el producto.
   * @param {string} fecha1 - Fecha de la primera acción.
   * @param {string} empleado2 - Segundo usuario que interactuó con el producto.
   * @param {string} fecha2 - Fecha de la segunda acción.
   * @param {string} empleado3 - Tercer usuario que interactuó con el producto.
   * @param {string} fecha3 - Fecha de la tercera acción.
   * @param {string} observaciones - Observaciones generales.
   */
  constructor(
    producto_id,
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
    this.producto_id = producto_id;
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

  /**
   * Convierte una fila de la base de datos en una instancia de HistorialProductos.
   * @param {Object} row - Fila obtenida de la base de datos.
   * @returns {HistorialProductos} Instancia del historial.
   */
  static fromRow(row) {
    return new HistorialProductos(
      row.producto_id,
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

  /**
   * Obtiene todos los registros del historial desde la vista.
   * @returns {Promise<Array<HistorialProductos>>} Lista completa del historial.
   * @throws {Error} Si ocurre un error en la consulta.
   */
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

  /**
   * Obtiene los registros del historial de un producto por su matrícula.
   * @param {string} matricula - Matrícula del producto.
   * @returns {Promise<Array<HistorialProductos>|null>} Registros encontrados o null.
   * @throws {Error} Si ocurre un error en la consulta.
   */
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
        return null;
      }

      console.log("✅ Historial encontrado:", rows);
      return rows.map((row) => HistorialProductos.fromRow(row));
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Obtiene un registro del historial por su ID.
   * @param {number} id - ID del historial.
   * @returns {Promise<Array<HistorialProductos>|null>} Registros encontrados o null.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  static async obtenerPorId(id) {
    try {
      console.log("🔍 Buscando historial para id:", id);

      const sql =
        "SELECT * FROM vista_historial_productos WHERE producto_id = ?";
      const [rows] = await db.query(sql, [id]);

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
