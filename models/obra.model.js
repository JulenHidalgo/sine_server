// Importar la configuración de la base de datos
const db = require("../config/database");

// Definición de la clase Obra
class Obra {
  // Constructor para crear una instancia de Obra
  constructor(ot, descripcion) {
    this.ot = ot;
    this.descripcion = descripcion;
  }

  // Método para convertir una fila de la base de datos en un objeto Obra
  static fromRow(row) {
    return new Obra(row.ot, row.descripcion);
  }

  // Método para obtener todas las obras desde la base de datos
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

  // Método para crear una nueva obra en la base de datos
  static async crear(obra) {
    try {
      console.log("🔍 Insertando obra con OT:", obra.ot);

      // Validación: la OT (identificador de la obra) es obligatoria
      if (!obra.ot) {
        console.log("❌ Error: La OT es obligatoria.");
        throw new Error("Faltan datos en la obra.");
      }

      // Si no se proporciona una descripción, se asigna una por defecto
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
