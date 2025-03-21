// Importar la configuración de la base de datos
const db = require("../config/database");

// Definición de los posibles estados del producto en manos del usuario
const ESTADO = Object.freeze({
  RECIBIDO: "Recibido",
  PARA_DEVOLVER: "Para devolver",
  DEVUELTO: "Devuelto",
});

// Definición de la clase Usuario_producto
class Usuario_producto {
  // Constructor para crear una instancia de Usuario_producto
  constructor(usuario_id, producto_id, estado, fecha) {
    this.usuario_id = usuario_id;
    this.producto_id = producto_id;
    this.estado = estado;
    this.fecha = fecha;
  }

  // Método para convertir una fila de la base de datos en un objeto de esta clase
  static fromRow(row) {
    return new Usuario_producto(
      row.usuario_id,
      row.producto_id,
      row.estado,
      row.fecha
    );
  }

  // Método para obtener todas las entradas de la tabla usuario_producto
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

  // Método para obtener las entradas de usuario_producto por matrícula de producto
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

  // Método para crear una nueva entrada en la tabla usuario_producto
  static async crear({ usuario_id, producto_id, estado, fecha }) {
    try {
      console.log(
        "🔍 Insertando usuario_producto con usuario_id:",
        usuario_id,
        "y matrícula:",
        producto_id
      );

      // Validación básica de datos requeridos
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
