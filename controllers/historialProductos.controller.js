// Importar el modelo HistorialProductos
const HistorialProductos = require("../models/historialProductos.model");

// Controlador para obtener todo el historial de productos
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

// Controlador para obtener historial por ID
const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Buscando historial con matrícula:", id);

    const historial = await HistorialProductos.obtenerPorId(id);

    // Si no se encuentra historial para ese ID, devolver 404
    if (!historial) {
      console.log("❌ No se encontró historial para el id:", id);
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

// Controlador para obtener historial por matrícula
const obtenerPorMatricula = async (req, res) => {
  try {
    const { matricula } = req.params;
    console.log("🔍 Buscando historial con matrícula:", matricula);

    const historial = await HistorialProductos.obtenerPorMatricula(matricula);

    // Si no se encuentra historial para esa matrícula, devolver 404
    if (!historial) {
      console.log("❌ No se encontró historial para el id:", matricula);
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
