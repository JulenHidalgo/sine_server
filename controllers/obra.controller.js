// Importar el modelo Obra
const Obra = require("../models/obra.model");

// Controlador para obtener todas las obras
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

// Controlador para crear una nueva obra
const crearObra = async (req, res) => {
  try {
    console.log("🔍 Recibiendo datos en req.body:", req.body);

    const { ot, descripcion } = req.body;

    // Verificar que el campo "ot" esté presente
    if (!ot) {
      console.log("❌ Error: La OT es obligatoria.");
      return res.status(400).json({ error: "Faltan datos en la obra" });
    }

    console.log("🔍 Creando obra con OT:", ot);

    // Crear la instancia de Obra y pasarla al modelo
    const obraCreada = await Obra.crear(new Obra(ot, descripcion));
    console.log("✅ Obra creada:", obraCreada);

    res.json(obraCreada);
  } catch (err) {
    console.error("❌ Error insertando obra:", err.message);
    res.status(500).json({ error: "Error insertando obra" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerObras,
  crearObra,
};
