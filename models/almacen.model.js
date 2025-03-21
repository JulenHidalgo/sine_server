// Importar la configuración de la base de datos
const db = require("../config/database");

// Definición de la clase Almacen
class Almacen {
  // Constructor para crear una instancia de Almacen
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  // Método para convertir una fila de la base de datos en un objeto Almacen
  static fromRow(row) {
    return new Almacen(row.id, row.nombre);
  }

  // Método para obtener todos los almacenes desde la base de datos
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

  // Método para crear un nuevo almacén en la base de datos
  static async crear(almacen) {
    try {
      console.log("🔍 Insertando almacén con nombre:", almacen.nombre);

      // Validación: el nombre del almacén es obligatorio
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
