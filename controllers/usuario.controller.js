// Importar el modelo de Usuario
const Usuario = require("../models/usuario.model");

// Controlador para obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    console.log("🔍 Obteniendo todos los usuarios...");
    const usuarios = await Usuario.obtenerTodos();
    console.log("✅ Usuarios obtenidos:", usuarios);
    res.json(usuarios);
  } catch (err) {
    console.error("❌ Error obteniendo usuarios:", err.message);
    res.status(500).json({ error: "Error obteniendo usuarios" });
  }
};

// Controlador para obtener solo los usuarios que están activos
const obtenerUsuariosActivos = async (req, res) => {
  try {
    console.log("🔍 Obteniendo usuarios activos...");
    const usuarios = await Usuario.obtenerActivos();
    console.log("✅ Usuarios activos obtenidos:", usuarios);
    res.json(usuarios);
  } catch (err) {
    console.error("❌ Error obteniendo usuarios activos:", err.message);
    res.status(500).json({ error: "Error obteniendo usuarios activos" });
  }
};

// Controlador para crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    console.log("🔍 Recibiendo datos en req.body:", req.body);

    const { nombre } = req.body;
    if (!nombre) {
      console.log("❌ Error: Nombre no proporcionado");
      return res.status(400).json({ error: "Faltan datos en el usuario" });
    }

    console.log("🔍 Creando usuario con nombre:", nombre);

    // Llamar al modelo para crear el usuario
    const usuarioCreado = await Usuario.crear({ nombre });

    console.log("✅ Usuario creado:", usuarioCreado);
    res.json(usuarioCreado);
  } catch (err) {
    console.error("❌ Error insertando usuario:", err.message);
    res.status(500).json({ error: "Error insertando usuario" });
  }
};

// Controlador para modificar el estado "activo" de un usuario
const modificarEstadoUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    console.log("🔍 Modificando usuario:", { id, activo });

    // Validar que se haya recibido el campo "activo"
    if (activo === undefined) {
      return res.status(400).json({ error: "Faltan datos (activo)" });
    }

    const resultado = await Usuario.modificar({ id, activo });

    // Si no se encuentra el usuario, devolver 404
    if (!resultado) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    console.log("✅ Usuario actualizado:", resultado);
    res.json({ mensaje: "Usuario actualizado", usuario: resultado });
  } catch (err) {
    console.error("❌ Error modificando usuario:", err.message);
    res.status(500).json({ error: "Error modificando usuario" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerUsuarios,
  obtenerUsuariosActivos,
  crearUsuario,
  modificarEstadoUsuario,
};
