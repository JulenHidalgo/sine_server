/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

// Importar la configuración de la base de datos
const db = require("../config/database");

// Definición de los posibles estados del producto en manos del usuario
const ESTADO = Object.freeze({
  RECIBIDO: "Recibido",
  PARA_DEVOLVER: "Para devolver",
  DEVUELTO: "Devuelto",
});

/**
 * Clase que representa la relación entre un usuario y un producto.
 */
class Usuario_producto {
  /**
   * Crea una instancia de Usuario_producto.
   * @param {number} usuario_id - ID del usuario.
   * @param {string} producto_id - Matrícula o ID del producto.
   * @param {string} estado - Estado del producto (ej. Recibido, Devuelto).
   * @param {string} fecha - Fecha del registro (formato YYYY-MM-DD).
   */
  constructor(usuario_id, producto_id, estado, fecha) {
    this.usuario_id = usuario_id;
    this.producto_id = producto_id;
    this.estado = estado;
    this.fecha = fecha;
  }

  /**
   * Convierte una fila de la base de datos en una instancia de Usuario_producto.
   * @param {Object} row - Fila obtenida desde la base de datos.
   * @returns {Usuario_producto} Instancia creada a partir de los datos.
   */
  static fromRow(row) {
    return new Usuario_producto(
      row.usuario_id,
      row.producto_id,
      row.estado,
      row.fecha
    );
  }

  /**
   * Obtiene todas las entradas de la tabla usuario_producto.
   * @returns {Promise<Array>} Lista de registros usuario-producto.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  static async obtenerTodos() {
    try {
      console.log("🔍 Ejecutando consulta: SELECT * FROM usuario_producto");
      const sql = `
        SELECT u.id AS usuario_id, u.nombre, up.producto_id, up.estado, up.fecha 
        FROM usuario_producto up 
        JOIN usuario u ON up.usuario_id = u.id`;
      const [rows] = await db.query(sql);
      console.log("✅ Entradas encontradas:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Obtiene las entradas de usuario_producto filtradas por matrícula del producto.
   * @param {string} producto_id - Matrícula o ID del producto.
   * @returns {Promise<Array>} Registros correspondientes al producto.
   * @throws {Error} Si ocurre un error en la consulta.
   */
  static async obtenerPorMatricula(producto_id) {
    try {
      console.log("🔍 Buscando usuario_producto con matrícula:", producto_id);

      const sql = `
        SELECT u.id AS usuario_id, u.nombre, up.producto_id, up.estado, up.fecha 
        FROM usuario_producto up 
        JOIN usuario u ON up.usuario_id = u.id 
        WHERE up.producto_id = ?`;
      const [rows] = await db.query(sql, [producto_id]);

      console.log("✅ Entradas encontradas:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Crea una nueva entrada en la tabla usuario_producto.
   * @param {Object} data - Datos del nuevo registro.
   * @param {number} data.usuario_id - ID del usuario.
   * @param {string} data.producto_id - Matrícula del producto.
   * @param {string} data.estado - Estado del producto.
   * @param {string} data.fecha - Fecha del movimiento.
   * @returns {Promise<Object>} Objeto con los datos insertados y el ID generado.
   * @throws {Error} Si faltan datos o hay un error en la inserción.
   */
  static async crear({ usuario_id, producto_id, estado, fecha }) {
    try {
      console.log(
        "🔍 Insertando usuario_producto con usuario_id:",
        usuario_id,
        "y matrícula:",
        producto_id
      );

      if (!usuario_id || !producto_id || !estado || !fecha) {
        console.log("❌ Error: Datos insuficientes.");
        throw new Error("Faltan datos en usuario_producto.");
      }

      const sql = `
        INSERT INTO usuario_producto (usuario_id, producto_id, estado, fecha) 
        VALUES (?, ?, ?, ?)`;
      const [result] = await db.query(sql, [
        usuario_id,
        producto_id,
        estado,
        fecha,
      ]);

      console.log("✅ Usuario_producto insertado correctamente.");
      return {
        usuario_id,
        producto_id,
        estado,
        fecha,
        id: result.insertId,
      };
    } catch (err) {
      console.error("❌ Error insertando usuario_producto:", err.message);
      throw err;
    }
  }
}

// Exportar la clase para su uso en otras partes del proyecto
module.exports = Usuario_producto;
