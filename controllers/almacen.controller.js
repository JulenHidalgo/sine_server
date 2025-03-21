// Importar el modelo Almacen
const Almacen = require("../models/almacen.model");

// Controlador para obtener todos los almacenes
const obtenerAlmacenes = async (req, res) => {
  try {
    console.log("🔍 Obteniendo todos los almacenes...");
    const almacenes = await Almacen.obtenerTodos();
    console.log("✅ Almacenes obtenidos:", almacenes);
    res.json(almacenes);
  } catch (err) {
    console.error("❌ Error obteniendo almacenes:", err.message);
    res.status(500).json({ error: "Error obteniendo almacenes" });
  }
};

// Controlador para crear un nuevo almacén
const crearAlmacen = async (req, res) => {
  try {
    console.log("🔍 Recibiendo datos en req.body:", req.body);

    const { nombre } = req.body;

    // Validar que se haya enviado el nombre del almacén
    if (!nombre) {
      console.log("❌ Error: El nombre del almacén es obligatorio.");
      return res.status(400).json({ error: "Faltan datos en el almacén" });
    }

    console.log("🔍 Creando almacén con nombre:", nombre);

    // Crear una instancia del almacén y guardarla en la base de datos
    const almacenCreado = await Almacen.crear(new Almacen(null, nombre));
    console.log("✅ Almacén creado:", almacenCreado);

    res.json(almacenCreado);
  } catch (err) {
    console.error("❌ Error insertando almacén:", err.message);
    res.status(500).json({ error: "Error insertando almacén" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerAlmacenes,
  crearAlmacen,
};
