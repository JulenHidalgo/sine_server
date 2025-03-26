// Importar la configuración de la base de datos
const db = require("../config/database");

/**
 * Clase que representa un almacén.
 */
class Almacen {
  /**
   * Crea una instancia de Almacen.
   * @param {number} id - Identificador del almacén.
   * @param {string} nombre - Nombre del almacén.
   */
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  /**
   * Convierte una fila de la base de datos en una instancia de Almacen.
   * @param {Object} row - Fila obtenida desde la base de datos.
   * @returns {Almacen} Instancia de la clase Almacen.
   */
  static fromRow(row) {
    return new Almacen(row.id, row.nombre);
  }

  /**
   * Obtiene todos los almacenes desde la base de datos.
   * @returns {Promise<Array>} Lista de almacenes.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async obtenerTodos() {
    try {
      console.log("🔍 Ejecutando consulta: SELECT * FROM almacen");
      const [rows] = await db.query("SELECT * FROM almacen");
      console.log("✅ Almacenes encontrados:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Obtiene todos los almacenes con el campo activo a true desde la base de datos.
   * @returns {Promise<Array>} Lista de almacenes activos.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async obtenerActivos() {
    try {
      console.log(
        "🔍 Ejecutando consulta: SELECT * FROM almacen WHERE activo = 1"
      );
      const [rows] = await db.query("SELECT * FROM almacen WHERE activo = 1");
      console.log("✅ Almacenes encontrados:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Crea un nuevo almacén en la base de datos.
   * @param {Object} almacen - Objeto que contiene el nombre del almacén.
   * @param {string} almacen.nombre - Nombre del nuevo almacén.
   * @returns {Promise<Object>} Almacén creado con su ID asignado.
   * @throws {Error} Si faltan datos o hay un error en la inserción.
   */
  static async crear(almacen) {
    try {
      console.log("🔍 Insertando almacén con nombre:", almacen.nombre);

      if (!almacen.nombre) {
        console.log("❌ Error: El nombre del almacén es obligatorio.");
        throw new Error("Faltan datos en el almacén.");
      }

      const sql = "INSERT INTO almacen (nombre) VALUES (?)";
      const [result] = await db.query(sql, [almacen.nombre]);

      console.log("✅ Almacén insertado con ID:", result.insertId);
      return { id: result.insertId, nombre: almacen.nombre };
    } catch (err) {
      console.error("❌ Error insertando almacén:", err.message);
      throw err;
    }
  }
}

// Exportar la clase para que pueda ser utilizada en otros módulos
module.exports = Almacen;
