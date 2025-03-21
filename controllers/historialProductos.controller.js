const HistorialProductos = require("../models/historialProductos.model");

// ✅ Obtener todo el historial de productos con async/await
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

// ✅ Obtener historial por matrícula con async/await
const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🔍 Buscando historial con matrícula:", id);

    const historial = await HistorialProductos.obtenerPorId(id);

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

// ✅ Obtener historial por matrícula con async/await
const obtenerPorMatricula = async (req, res) => {
  try {
    const { matricula } = req.params;
    console.log("🔍 Buscando historial con matrícula:", matricula);

    const historial = await HistorialProductos.obtenerPorMatricula(matricula);

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

module.exports = {
  obtenerTodos,
  obtenerPorId,
  obtenerPorMatricula,
};
