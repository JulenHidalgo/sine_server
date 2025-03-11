const Usuario = require("../models/usuario.model");

// Obtener todos los usuarios
const obtenerUsuarios = (req, res) => {
  Usuario.obtenerTodos((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error obteniendo usuarios" });
    }
    res.json(results);
  });
};

// Obtener solo los usuarios activos
const obtenerUsuariosActivos = (req, res) => {
  Usuario.obtenerActivos((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error obteniendo usuarios activos" });
    }
    res.json(results);
  });
};

// Crear un nuevo usuario
const crearUsuario = (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "Faltan datos en el usuario" });
  }

  const usuario = new Usuario(null, nombre, true);
  Usuario.crear(usuario, (err, usuarioCreado) => {
    if (err) {
      return res.status(500).json({ error: "Error insertando usuario" });
    }
    res.json(usuarioCreado);
  });
};

// Modificar el estado "activo" de un usuario
const modificarEstadoUsuario = (req, res) => {
  const { id } = req.params;
  const { activo } = req.body;
  console.log(activo);
  console.log(id);

  if (!activo) {
    return res.status(400).json({ error: "Faltan datos (activo)" });
  }

  Usuario.modificar({ id, activo }, (err, resultado) => {
    if (err) {
      return res.status(500).json({ error: "Error modificando usuario" });
    }
    res.json({ mensaje: "Usuario actualizado", usuario: resultado });
  });
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuariosActivos,
  crearUsuario,
  modificarEstadoUsuario,
};
