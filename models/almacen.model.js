const db = require("../config/database");

class Almacen {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }

  // Método para mapear un objeto de la base de datos a la clase Almacen
  static fromRow(row) {
    return new Almacen(row.id, row.nombre);
  }

  // ✅ Obtener todos los almacenes con async/await
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

  // ✅ Crear un nuevo almacén con async/await
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

module.exports = Almacen;
