/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

// Importar la configuración de la base de datos
const db = require("../config/database");

/**
 * Clase que representa una obra.
 */
class Obra {
  /**
   * Crea una instancia de Obra.
   * @param {string} ot - Código de orden de trabajo (OT) de la obra.
   * @param {string} descripcion - Descripción de la obra.
   */
  constructor(ot, descripcion) {
    this.ot = ot;
    this.descripcion = descripcion;
  }

  /**
   * Convierte una fila de la base de datos en una instancia de Obra.
   * @param {Object} row - Fila obtenida de la base de datos.
   * @returns {Obra} Instancia de la clase Obra.
   */
  static fromRow(row) {
    return new Obra(row.ot, row.descripcion);
  }

  /**
   * Obtiene todas las obras desde la base de datos.
   * @returns {Promise<Array>} Lista de obras.
   * @throws {Error} Si ocurre un error durante la consulta.
   */
  static async obtenerTodos() {
    try {
      console.log("🔍 Ejecutando consulta: SELECT * FROM obra");
      const [rows] = await db.query("SELECT * FROM obra");
      console.log("✅ Obras encontradas:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  /**
   * Crea una nueva obra en la base de datos.
   * @param {Obra} obra - Objeto con los datos de la obra.
   * @returns {Promise<Object>} Obra creada.
   * @throws {Error} Si faltan datos o hay error en la inserción.
   */
  static async crear(obra) {
    try {
      console.log("🔍 Insertando obra con OT:", obra.ot);

      if (!obra.ot) {
        console.log("❌ Error: La OT es obligatoria.");
        throw new Error("Faltan datos en la obra.");
      }

      if (!obra.descripcion || obra.descripcion.trim() === "") {
        obra.descripcion =
          "No se ha introducido una descripción para esta obra";
      }

      const sql = "INSERT INTO obra (ot, descripcion) VALUES (?, ?)";
      const [result] = await db.query(sql, [obra.ot, obra.descripcion]);

      console.log("✅ Obra insertada con OT:", obra.ot);
      return { ot: obra.ot, descripcion: obra.descripcion };
    } catch (err) {
      console.error("❌ Error insertando obra:", err.message);
      throw err;
    }
  }
}

// Exportar la clase para que pueda ser utilizada en otros módulos
module.exports = Obra;
