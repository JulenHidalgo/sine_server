// Importar el modelo Almacen
const Almacen = require("../models/almacen.model");

/**
 * @typedef {Object} Request
 * @description Objeto de solicitud HTTP (Express).
 */

/**
 * @typedef {Object} Response
 * @description Objeto de respuesta HTTP (Express).
 */

/**
 * Controlador para obtener todos los almacenes.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
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

/**
 * Controlador para obtener todos los almacenes con el campo activo a true.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerAlmacenesActivos = async (req, res) => {
  try {
    console.log("🔍 Obteniendo todos los almacenes activos...");
    const almacenes = await Almacen.obtenerActivos();
    console.log("✅ Almacenes obtenidos:", almacenes);
    res.json(almacenes);
  } catch (err) {
    console.error("❌ Error obteniendo almacenes activos:", err.message);
    res.status(500).json({ error: "Error obteniendo almacenes activos" });
  }
};

/**
 * Controlador para crear un nuevo almacén.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const crearAlmacen = async (req, res) => {
  try {
    console.log("🔍 Recibiendo datos en req.body:", req.body);

    const { nombre } = req.body;

    if (!nombre) {
      console.log("❌ Error: El nombre del almacén es obligatorio.");
      return res.status(400).json({ error: "Faltan datos en el almacén" });
    }

    console.log("🔍 Creando almacén con nombre:", nombre);

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
  obtenerAlmacenesActivos,
  crearAlmacen,
};
