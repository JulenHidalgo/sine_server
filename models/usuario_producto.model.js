const db = require("../config/database");

const ESTADO = Object.freeze({
  RECIBIDO: "Recibido",
  PARA_DEVOLVER: "Para devolver",
  DEVUELTO: "Devuelto",
});

class Usuario_producto {
  constructor(usuario_id, producto_id, estado, fecha) {
    this.usuario_id = usuario_id;
    this.producto_id = producto_id;
    this.estado = estado;
    this.fecha = fecha;
  }

  // Método para mapear un objeto de la base de datos a la clase Usuario_producto
  static fromRow(row) {
    return new Usuario_producto(
      row.usuario_id,
      row.producto_id,
      row.estado,
      row.fecha
    );
  }

  // ✅ Obtener todas las entradas en usuario_producto con async/await
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

  // ✅ Obtener entradas de usuario_producto por matrícula con async/await
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

  // ✅ Crear una nueva entrada en usuario_producto con async/await
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

module.exports = Usuario_producto;
