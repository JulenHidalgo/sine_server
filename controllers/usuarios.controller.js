const Usuario = require("../models/usuarios.model");

const obtenerUsuarios = (req, res) => {
  Usuario.obtenerTodos((err, results) => {
    if (err) {
      res.status(500).json({ error: "Error obteniendo usuarios" });
      return;
    }
    res.json(results);
  });
};

const crearUsuario = (req, res) => {
  const { nombre, email } = req.body;
  if (!nombre || !email) {
    res.status(400).json({ error: "Faltan datos" });
    return;
  }
  Usuario.crear(nombre, email, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error insertando usuario" });
      return;
    }
    res.json({ mensaje: "Usuario creado", id: result.insertId });
  });
};

const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  Usuario.eliminar(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error eliminando usuario" });
      return;
    }
    res.json({ mensaje: "Usuario eliminado" });
  });
};

module.exports = { obtenerUsuarios, crearUsuario, eliminarUsuario };
