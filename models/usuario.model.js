const db = require("../config/database");

class Usuario {
  constructor(id, nombre, activo) {
    this.id = id;
    this.nombre = nombre;
    this.activo = activo;
  }

  // Método para mapear un objeto de la base de datos a la clase Usuario
  static fromRow(row) {
    return new Usuario(row.id, row.nombre, row.activo);
  }

  static async obtenerTodos() {
    try {
      console.log("🔍 Ejecutando consulta: SELECT * FROM usuario"); // Verificar si se ejecuta la consulta
      const [rows] = await db.query("SELECT * FROM usuario");
      console.log("✅ Consulta ejecutada correctamente:", rows); // Ver datos devueltos
      return rows.map((row) => Usuario.fromRow(row));
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message); // Mostrar el mensaje de error
      throw err;
    }
  }

  // Obtener todos los usuarios con el atributo Activo igual a True
  static obtenerActivos(callback) {
    db.query("SELECT * FROM usuario WHERE activo = 1", (err, results) => {
      if (err) return callback(err, null);
      const usuarios = results.map((row) => Usuario.fromRow(row));
      callback(null, usuarios);
    });
  }

  // Crear un nuevo usuario
  static crear(usuario, callback) {
    const sql = "INSERT INTO usuario (nombre, activo) VALUES (?, 1)";
    db.query(sql, [usuario.nombre], (err, result) => {
      if (err) return callback(err, null);
      usuario.id = result.insertId;
      callback(null, usuario);
    });
  }

  // Modificar el atributo "activo" de un usuario
  static modificar(usuario, callback) {
    const sql = "UPDATE usuario SET activo = ? WHERE id = ?";
    db.query(sql, [usuario.activo, usuario.id], (err, result) => {
      if (err) return callback(err, null);

      // Verificamos si se modificó algún registro
      if (result.affectedRows === 0) {
        return callback(new Error("Usuario no encontrado"), null);
      }

      callback(null, usuario);
    });
  }
}

module.exports = Usuario;
