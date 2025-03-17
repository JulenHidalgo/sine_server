const db = require("../config/database");

class Usuario {
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

  static async crear(usuario) {
    try {
      console.log("🔍 Insertando usuario con nombre:", usuario.nombre);

      if (!usuario.nombre) {
        console.log("❌ Error: El nombre es undefined o vacío.");
        throw new Error("El nombre del usuario no puede estar vacío.");
      }

      const sql = "INSERT INTO usuario (nombre, activo) VALUES (?, 1)";
      const [result] = await db.query(sql, [usuario.nombre]);

      usuario.id = result.insertId;
      console.log("✅ Usuario insertado con ID:", usuario.id);
      return usuario;
    } catch (err) {
      console.error("❌ Error insertando usuario:", err.message);
      throw err;
    }
  }

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

module.exports = Usuario;
