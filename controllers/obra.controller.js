/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

// Importar el modelo Obra
const Obra = require("../models/obra.model");

/**
 * @typedef {Object} Request
 * @description Objeto de solicitud HTTP (Express).
 */

/**
 * @typedef {Object} Response
 * @description Objeto de respuesta HTTP (Express).
 */

/**
 * Controlador para obtener todas las obras.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerObras = async (req, res) => {
  try {
    console.log("🔍 Obteniendo todas las obras...");
    const obras = await Obra.obtenerTodos();
    console.log("✅ Obras obtenidas:", obras);
    return res.json(obras);
  } catch (err) {
    console.error("❌ Error obteniendo obras:", err.message);
    return res.status(500).json({ error: "Error obteniendo obras" });
  }
};

/**
 * Controlador para crear una nueva obra.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
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

    return res.json(obraCreada);
  } catch (err) {
    console.error("❌ Error insertando obra:", err.message);
    return res.status(500).json({ error: "Error insertando obra" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerObras,
  crearObra,
};
