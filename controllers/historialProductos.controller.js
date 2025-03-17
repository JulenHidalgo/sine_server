const HistorialProductos = require("../models/historialProductos.model");

// ✅ Obtener todos los registros con async/await
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

module.exports = {
  obtenerTodos,
};
