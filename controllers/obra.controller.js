const Obra = require("../models/obra.model");

// ✅ Obtener todas las obras con async/await
const obtenerObras = async (req, res) => {
  try {
    console.log("🔍 Obteniendo todas las obras...");
    const obras = await Obra.obtenerTodos();
    console.log("✅ Obras obtenidas:", obras);
    res.json(obras);
  } catch (err) {
    console.error("❌ Error obteniendo obras:", err.message);
    res.status(500).json({ error: "Error obteniendo obras" });
  }
};

// ✅ Crear una nueva obra con async/await
const crearObra = async (req, res) => {
  try {
    console.log("🔍 Recibiendo datos en req.body:", req.body);

    const { ot, descripcion } = req.body;
    if (!ot) {
      console.log("❌ Error: La OT es obligatoria.");
      return res.status(400).json({ error: "Faltan datos en la obra" });
    }

    console.log("🔍 Creando obra con OT:", ot);
    const obraCreada = await Obra.crear(new Obra(ot, descripcion));
    console.log("✅ Obra creada:", obraCreada);

    res.json(obraCreada);
  } catch (err) {
    console.error("❌ Error insertando obra:", err.message);
    res.status(500).json({ error: "Error insertando obra" });
  }
};

module.exports = {
  obtenerObras,
  crearObra,
};
