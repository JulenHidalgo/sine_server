// Importar el modelo HistorialProductos
const HistorialProductos = require("../models/historialProductos.model");

/**
 * @typedef {Object} Request
 * @description Objeto de solicitud HTTP (Express).
 */

/**
 * @typedef {Object} Response
 * @description Objeto de respuesta HTTP (Express).
 */

/**
 * Controlador para obtener todo el historial de productos.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerTodos = async (req, res) => {
  try {
    console.log("🔍 Obteniendo historial de productos...");
    const historial = await HistorialProductos.obtenerTodos();
    console.log("✅ Historial obtenido:", historial);
    res.json(historial);
  } catch (err) {
    console.error("❌ Error obteniendo historial de productos:", err.message);
    res.status(500).json({ error: "Error obteniendo la información" });
  }
};

/**
 * Controlador para obtener historial por ID.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Buscando historial con ID:", id);

    const historial = await HistorialProductos.obtenerPorId(id);

    if (!historial) {
      console.log("❌ No se encontró historial para el ID:", id);
      return res
        .status(404)
        .json({ error: "No se encontró historial para este ID" });
    }

    console.log("✅ Historial encontrado:", historial);
    res.json(historial);
  } catch (err) {
    console.error("❌ Error obteniendo historial por ID:", err.message);
    res.status(500).json({ error: "Error obteniendo la información" });
  }
};

/**
 * Controlador para obtener historial por matrícula de producto.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerPorMatricula = async (req, res) => {
  try {
    const { matricula } = req.params;
    console.log("🔍 Buscando historial con matrícula:", matricula);

    const historial = await HistorialProductos.obtenerPorMatricula(matricula);

    if (!historial) {
      console.log("❌ No se encontró historial para la matrícula:", matricula);
      return res
        .status(404)
        .json({ error: "No se encontró historial para esta matrícula" });
    }

    console.log("✅ Historial encontrado:", historial);
    res.json(historial);
  } catch (err) {
    console.error("❌ Error obteniendo historial por matrícula:", err.message);
    res.status(500).json({ error: "Error obteniendo la información" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerPorMatricula,
};
