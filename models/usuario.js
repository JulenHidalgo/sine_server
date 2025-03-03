const db = require("../config/database");

const Usuario = {
  obtenerTodos: (callback) => {
    db.query("SELECT * FROM usuarios", callback);
  },

  crear: (nombre, email, callback) => {
    const sql = "INSERT INTO usuarios (nombre, email) VALUES (?, ?)";
    db.query(sql, [nombre, email], callback);
  },

  eliminar: (id, callback) => {
    const sql = "DELETE FROM usuarios WHERE id = ?";
    db.query(sql, [id], callback);
  },
};

module.exports = Usuario;
