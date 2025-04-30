/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

// Importar el modelo de Usuario
const Usuario = require("../models/usuario.model");

/**
 * @typedef {Object} Request
 * @description Objeto de solicitud HTTP (Express).
 */

/**
 * @typedef {Object} Response
 * @description Objeto de respuesta HTTP (Express).
 */

/**
 * Controlador para obtener todos los usuarios.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerUsuarios = async (req, res) => {
  try {
    console.log("🔍 Obteniendo todos los usuarios...");
    const usuarios = await Usuario.obtenerTodos();
    console.log("✅ Usuarios obtenidos:", usuarios);
    return res.json(usuarios);
  } catch (err) {
    console.error("❌ Error obteniendo usuarios:", err.message);
    return res.status(500).json({ error: "Error obteniendo usuarios" });
  }
};

/**
 * Controlador para obtener solo los usuarios activos.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerUsuariosActivos = async (req, res) => {
  try {
    console.log("🔍 Obteniendo usuarios activos...");
    const usuarios = await Usuario.obtenerActivos();
    console.log("✅ Usuarios activos obtenidos:", usuarios);
    return res.json(usuarios);
  } catch (err) {
    console.error("❌ Error obteniendo usuarios activos:", err.message);
    return res.status(500).json({ error: "Error obteniendo usuarios activos" });
  }
};

/**
 * Controlador para obtener un usuario mediante el nombre.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerUsuarioNombre = async (req, res) => {
  try {
    const { nombre } = req.params;

    console.log("🔍 Comprobando si existe el usuario");

    const usuario = await Usuario.obtenerPorNombre(nombre);

    if (usuario.length === 0) {
      console.log("❌ Usuario no encontrado:", nombre);
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("✅ Usuario obtenidos:", usuario);
    return res.status(200).json(usuario);
  } catch (err) {
    console.error("❌ Error obteniendo usuario por nombre:", err.message);
    return res
      .status(500)
      .json({ error: "Error obteniendo usuario por nombre" });
  }
};

/**
 * Controlador para crear un nuevo usuario.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const crearUsuario = async (req, res) => {
  try {
    console.log("🔍 Recibiendo datos en req.body:", req.body);

    const { nombre } = req.body;
    if (!nombre) {
      console.log("❌ Error: Nombre no proporcionado");
      return res.status(400).json({ error: "Faltan datos en el usuario" });
    }

    console.log("🔍 Creando usuario con nombre:", nombre);

    const usuarioCreado = await Usuario.crear({ nombre });

    console.log("✅ Usuario creado:", usuarioCreado);
    return res.json(usuarioCreado);
  } catch (err) {
    console.error("❌ Error insertando usuario:", err.message);
    return res.status(500).json({ error: "Error insertando usuario" });
  }
};

/**
 * Controlador para modificar el estado activo/inactivo de un usuario.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const modificarEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    console.log("🔍 Modificando usuario:", { id, activo });

    if (activo === undefined) {
      return res.status(400).json({ error: "Faltan datos (activo)" });
    }

    const resultado = await Usuario.modificar({ id, activo });

    if (!resultado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("✅ Usuario actualizado:", resultado);
    return res.json({ mensaje: "Usuario actualizado", usuario: resultado });
  } catch (err) {
    console.error("❌ Error modificando usuario:", err.message);
    return res.status(500).json({ error: "Error modificando usuario" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerUsuarios,
  obtenerUsuariosActivos,
  crearUsuario,
  obtenerUsuarioNombre,
  modificarEstadoUsuario,
};
