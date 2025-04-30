/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

// Importar la configuración de la base de datos
const db = require("../config/database");

/**
 * Clase que representa operaciones relacionadas con usuarios.
 */
class Usuario {
  /**
   * Obtiene todos los usuarios de la base de datos.
   * @returns {Promise<Array>} Lista de usuarios.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async obtenerTodos() {
    try {
      console.log("🔍 Ejecutando consulta: SELECT * FROM usuario");
      const [rows] = await db.query("SELECT * FROM usuario");
      console.log("✅ Usuarios encontrados:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Obtiene los usuarios que están activos.
   * @returns {Promise<Array>} Lista de usuarios activos.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async obtenerActivos() {
    try {
      console.log(
        "🔍 Ejecutando consulta: SELECT * FROM usuario WHERE activo = 1"
      );
      const [rows] = await db.query("SELECT * FROM usuario WHERE activo = 1");
      console.log("✅ Usuarios activos encontrados:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Obtiene el usuario que coincida con el nombre.
   * @returns {Promise<Array>} Usuario que coincide con el nombre.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async obtenerPorNombre(nombre) {
    try {
      console.log(
        "🔍 Ejecutando consulta: SELECT * FROM usuario WHERE nombre = " + nombre
      );
      const [rows] = await db.query("SELECT * FROM usuario WHERE nombre = ?", [
        nombre,
      ]);
      console.log("✅ Usuario encontrado:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Crea un nuevo usuario en la base de datos.
   * @param {Object} usuario - Objeto que contiene los datos del usuario.
   * @param {string} usuario.nombre - Nombre del usuario.
   * @returns {Promise<Object>} Usuario creado con ID asignado.
   * @throws {Error} Si faltan datos o ocurre un error en la inserción.
   */
  static async crear(usuario) {
    try {
      console.log("🔍 Insertando usuario con nombre:", usuario.nombre);

      if (!usuario || !usuario.nombre) {
        console.log("❌ Error: El nombre es undefined o vacío.");
        throw new Error("El nombre del usuario no puede estar vacío.");
      }

      const sql = "INSERT INTO usuario (nombre, activo) VALUES (?, 1)";
      const [result] = await db.query(sql, [usuario.nombre]);

      usuario.id = result.insertId;
      usuario.activo = 1;
      console.log("✅ Usuario insertado con ID:", usuario.id);
      return usuario;
    } catch (err) {
      console.error("❌ Error insertando usuario:", err.message);
      throw err;
    }
  }

  /**
   * Modifica el estado (activo/inactivo) de un usuario.
   * @param {Object} usuario - Objeto que contiene el ID y nuevo estado.
   * @param {number} usuario.id - ID del usuario.
   * @param {boolean|number} usuario.activo - Nuevo estado del usuario.
   * @returns {Promise<Object|null>} Usuario actualizado o null si no se encontró.
   * @throws {Error} Si ocurre un error en la actualización.
   */
  static async modificar(usuario) {
    try {
      console.log(
        "🔍 Modificando usuario ID:",
        usuario.id,
        "Estado:",
        usuario.activo
      );
      const sql = "UPDATE usuario SET activo = ? WHERE id = ?";
      const [result] = await db.query(sql, [usuario.activo, usuario.id]);

      if (result.affectedRows === 0) {
        console.log("❌ Usuario no encontrado:", usuario.id);
        return null;
      }

      console.log("✅ Usuario actualizado correctamente.");
      return usuario;
    } catch (err) {
      console.error("❌ Error modificando usuario:", err.message);
      throw err;
    }
  }
}

// Exportar la clase para su uso en otras partes del proyecto
module.exports = Usuario;
