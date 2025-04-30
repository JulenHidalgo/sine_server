/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

// Importar la configuración de la base de datos
const db = require("../config/database");

/**
 * Clase que representa un producto.
 */
class Producto {
  /**
   * Crea una instancia de Producto.
   * @param {number} id - Identificador del producto.
   * @param {string} matricula - Matrícula del producto.
   * @param {string} observaciones - Observaciones del producto.
   * @param {number} almacen_id - ID del almacén donde se encuentra el producto.
   * @param {string} obra_ot - Código de la obra asociada.
   */
  constructor(id, matricula, observaciones, almacen_id, obra_ot) {
    this.id = id;
    this.matricula = matricula;
    this.observaciones = observaciones;
    this.almacen_id = almacen_id;
    this.obra_ot = obra_ot;
  }

  /**
   * Convierte una fila de la base de datos en una instancia de Producto.
   * @param {Object} row - Fila de datos desde la base de datos.
   * @returns {Producto} Instancia del producto.
   */
  static fromRow(row) {
    return new Producto(
      row.id,
      row.matricula,
      row.observaciones,
      row.almacen_id,
      row.obra_ot
    );
  }

  /**
   * Obtiene todos los productos desde la base de datos.
   * @returns {Promise<Array>} Lista de productos.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async obtenerTodos() {
    try {
      console.log("🔍 Ejecutando consulta: SELECT * FROM producto");
      const [rows] = await db.query("SELECT * FROM producto");
      console.log("✅ Productos encontrados:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Crea un nuevo producto en la base de datos.
   * @param {Object} producto - Objeto con los datos del producto.
   * @param {number} producto.id - ID del producto.
   * @param {string} producto.matricula - Matrícula del producto.
   * @param {string} [producto.observaciones] - Observaciones (opcional).
   * @param {number} producto.almacen_id - ID del almacén.
   * @param {string} producto.obra_ot - Código de la obra.
   * @returns {Promise<Object>} Producto creado con ID insertado.
   * @throws {Error} Si faltan datos o ocurre un error al insertar.
   */
  static async crear(producto) {
    try {
      console.log("🔍 Insertando producto con matrícula:", producto.matricula);

      if (
        !producto.id ||
        !producto.matricula ||
        !producto.almacen_id ||
        !producto.obra_ot
      ) {
        console.log("❌ Error: Datos insuficientes.");
        throw new Error("Faltan datos en el producto.");
      }

      const sql =
        "INSERT INTO producto (id, matricula, observaciones, almacen_id, obra_ot) VALUES (?, ?, ?, ?, ?)";
      const [result] = await db.query(sql, [
        producto.id,
        producto.matricula,
        producto.observaciones || "",
        producto.almacen_id,
        producto.obra_ot,
      ]);

      console.log("✅ Producto insertado con matrícula:", producto.matricula);
      return { ...producto, id: result.insertId };
    } catch (err) {
      console.error("❌ Error insertando producto:", err.message);
      throw err;
    }
  }

  /**
   * Modifica las observaciones de un producto existente.
   * @param {Object} producto - Objeto con los datos actualizados.
   * @param {number} producto.id - ID del producto.
   * @param {string} producto.matricula - Matrícula del producto.
   * @param {string} producto.observaciones - Nuevas observaciones a añadir.
   * @returns {Promise<Object|null>} Producto actualizado o null si no se encontró.
   * @throws {Error} Si faltan datos o ocurre un error al modificar.
   */
  static async modificar(id, observaciones) {
    try {
      console.log(
        "🔍 Modificando producto con id:",
        id,
        "Nuevas observaciones:",
        observaciones
      );

      if (!id || !observaciones) {
        console.log("❌ Error: Datos insuficientes.");
        throw new Error("Faltan datos (observaciones).");
      }

      const sql =
        "UPDATE producto SET observaciones = CONCAT(observaciones, ?) WHERE id = ?";
      const [result] = await db.query(sql, ["; " + observaciones, id]);

      if (result.affectedRows === 0) {
        console.log("❌ Producto no encontrado:", id);
        return null;
      }

      console.log("✅ Producto actualizado correctamente.");
      return result;
    } catch (err) {
      console.error("❌ Error modificando producto:", err.message);
      throw err;
    }
  }
}

// Exportar la clase para que pueda ser utilizada en otros módulos
module.exports = Producto;
