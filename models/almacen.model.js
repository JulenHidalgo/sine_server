/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

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
   * Obtiene todos el almacen con id requerido desde la base de datos.
   * @returns {Promise<Array>} Lista de almacenes.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async obtenerPorId(id) {
    try {
      console.log(
        "🔍 Ejecutando consulta: SELECT * FROM almacen WHERE id = " + id
      );
      const [rows] = await db.query("SELECT * FROM almacen WHERE id = ?", [id]);
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
   * Obtiene el almacen que coincida con el nombre.
   * @returns {Promise<Array>} Lista de almacenes activos.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async obtenerPorNombre(nombre) {
    try {
      console.log(
        "🔍 Ejecutando consulta: SELECT * FROM almacen WHERE nombre = " + nombre
      );
      const [rows] = await db.query("SELECT * FROM almacen WHERE nombre = ?", [
        nombre,
      ]);
      console.log("✅ Almacenes encontrados:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Comprueba si existe un almacén con el nombre proporcionado.
   * Si existe, cambia todos los productos del almacén actual al existente.
   * Si no existe, actualiza el nombre del almacén actual.
   *
   * @param {number} id - ID del almacén a modificar.
   * @param {string} nombre - Nuevo nombre del almacén.
   *
   * @returns {Promise<void>}
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async modificarAlmacen(id, nombre) {
    try {
      if (!id || !nombre) {
        throw new Error("ID y nombre del almacén son obligatorios.");
      }

      const almacenId = await this.existeAlmacen(nombre);

      if (almacenId !== null) {
        console.log(
          `🔄 Moviendo productos del almacén ID ${id} al almacén existente con nombre '${nombre}' (ID: ${almacenId})`
        );
        const sql = "UPDATE producto SET almacen_id = ? WHERE almacen_id = ?";
        const [result] = await db.query(sql, [almacenId, id]);

        if (result.affectedRows === 0) {
          console.log(
            "❌ No se encontraron productos asociados al almacén:",
            id
          );
        }

        console.log("✅ Productos actualizados correctamente.");

        //Eliminar de la base de datos el almacén que ya no tiene productos.
        console.log(`🗑 Eliminando almacén ID ${id} sin productos asociados`);
        const sqlDelete = "DELETE FROM almacen WHERE id = ?";
        const [resultDelete] = await db.query(sqlDelete, [id]);

        if (resultDelete.affectedRows === 0) {
          console.log(
            "ℹ️ No se eliminó ningún almacén, puede que ya no exista:",
            id
          );
        }

        console.log("✅ Almacen eliminado correctamente.");
      } else {
        console.log(`✏️ Renombrando almacén ID ${id} a '${nombre}'`);
        const sql = "UPDATE almacen SET nombre = ? WHERE id = ?";
        const [result] = await db.query(sql, [nombre, id]);

        if (result.affectedRows === 0) {
          console.log("❌ Almacén no encontrado:", id);
        }

        console.log("✅ Almacén renombrado correctamente.");
      }
    } catch (err) {
      console.error("❌ Error en modificarAlmacen:", err.message);
      throw err;
    }
  }

  /**
   * Modifica el atributo estado de un almacen
   *
   * @param {number} id - ID del almacén a modificar.
   * @param {string} activo - Nuevo nombre del almacén.
   *
   * @returns {Promise<void>}
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async modificarActivoAlmacen(id, activo) {
    try {
      if (!id || activo === null) {
        throw new Error("ID y activo del almacén son obligatorios.");
      }

      const sql = "UPDATE almacen SET activo = ? WHERE id = ?";
      const [result] = await db.query(sql, [activo, id]);

      if (result.affectedRows === 0) {
        console.log("❌ Almacén no encontrado:", id);
      }

      console.log("✅ Almacén renombrado correctamente.");
    } catch (err) {
      console.error("❌ Error en modificarAlmacen:", err.message);
      throw err;
    }
  }

  /**
   * Verifica si existe un almacén con el nombre dado.
   *
   * @param {string} nombre - Nombre del almacén a buscar.
   * @returns {Promise<number|null>} ID del almacén si existe, o null si no existe.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async existeAlmacen(nombre) {
    try {
      console.log(
        "🔍 Ejecutando consulta: SELECT id FROM almacen WHERE nombre = ?"
      );
      const [rows] = await db.query("SELECT id FROM almacen WHERE nombre = ?", [
        nombre,
      ]);
      console.log("✅ Resultado de la consulta:", rows);

      return rows.length > 0 ? rows[0].id : null;
    } catch (err) {
      console.error("❌ Error en existeAlmacen:", err.message);
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
