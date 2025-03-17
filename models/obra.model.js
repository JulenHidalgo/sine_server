const db = require("../config/database");

class Obra {
  constructor(ot, descripcion) {
    this.ot = ot;
    this.descripcion = descripcion;
  }

  // Método para mapear un objeto de la base de datos a la clase Obra
  static fromRow(row) {
    return new Obra(row.ot, row.descripcion);
  }

  // ✅ Obtener todas las obras con async/await
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

  // ✅ Crear una nueva obra con async/await
  static async crear(obra) {
    try {
      console.log("🔍 Insertando obra con OT:", obra.ot);

      if (!obra.ot) {
        console.log("❌ Error: La OT es obligatoria.");
        throw new Error("Faltan datos en la obra.");
      }

      // Si la descripción no se proporciona, se asigna un valor por defecto
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

module.exports = Obra;
