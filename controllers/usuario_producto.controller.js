/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

// Importar el modelo Usuario_producto
const Usuario_producto = require("../models/usuario_producto.model");

/**
 * @typedef {Object} Request
 * @description Objeto de solicitud HTTP (Express).
 */

/**
 * @typedef {Object} Response
 * @description Objeto de respuesta HTTP (Express).
 */

/**
 * Controlador para obtener todas las entradas de la tabla usuario_producto.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerUsuario_productos = async (req, res) => {
  try {
    console.log("🔍 Obteniendo todas las entradas en usuario_producto...");
    const usuario_productos = await Usuario_producto.obtenerTodos();
    console.log("✅ Entradas obtenidas:", usuario_productos);
    return res.json(usuario_productos);
  } catch (err) {
    console.error("❌ Error obteniendo usuario_productos:", err.message);
    return res
      .status(500)
      .json({ error: "Error obteniendo las entradas de usuario_producto" });
  }
};

/**
 * Controlador para obtener entradas de usuario_producto filtradas por matrícula.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerUsuario_productoPorMatricula = async (req, res) => {
  try {
    const { producto_id } = req.params;
    console.log("🔍 Buscando usuario_producto con matrícula:", producto_id);

    const usuario_productos = await Usuario_producto.obtenerPorMatricula(
      producto_id
    );

    if (usuario_productos.length === 0) {
      console.log(
        "❌ No se encontraron registros para la matrícula:",
        producto_id
      );
      return res
        .status(404)
        .json({ error: "No se encontraron registros para esta matrícula" });
    }

    console.log("✅ Entradas encontradas:", usuario_productos);
    return res.json(usuario_productos);
  } catch (err) {
    console.error(
      "❌ Error obteniendo usuario_producto por matrícula:",
      err.message
    );
    return res.status(500).json({
      error: "Error obteniendo las entradas de usuario_producto por matrícula",
    });
  }
};

/**
 * Controlador para crear una nueva entrada en la tabla usuario_producto.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const crearUsuario_producto = async (req, res) => {
  try {
    console.log("🔍 Recibiendo datos en req.body:", req.body);

    const { usuario_id, producto_id, estado, fecha } = req.body;

    if (!usuario_id || !producto_id || !estado || !fecha) {
      console.log("❌ Error: Datos insuficientes.");
      return res
        .status(400)
        .json({ error: "Faltan datos en usuario_producto" });
    }

    console.log("🔍 Creando usuario_producto...");
    const usuario_productoCreado = await Usuario_producto.crear({
      usuario_id,
      producto_id,
      estado,
      fecha,
    });
    console.log("✅ Usuario_producto creado:", usuario_productoCreado);

    return res.json(usuario_productoCreado);
  } catch (err) {
    console.error("❌ Error insertando usuario_producto:", err.message);
    return res.status(500).json({ error: "Error insertando usuario_producto" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerUsuario_productos,
  crearUsuario_producto,
  obtenerUsuario_productoPorMatricula,
};
