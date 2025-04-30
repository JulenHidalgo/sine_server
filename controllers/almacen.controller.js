/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

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
    return res.json(almacenes);
  } catch (err) {
    console.error("❌ Error obteniendo almacenes:", err.message);
    return res.status(500).json({ error: "Error obteniendo almacenes" });
  }
};

/**
 * Controlador para obtener el almacen por id.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerAlmacenPorId = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🔍 Obteniendo el almacen con id " + id + "...");
    const almacenes = await Almacen.obtenerPorId(id);
    console.log("✅ Almacenes obtenidos:", almacenes);
    return res.json(almacenes);
  } catch (err) {
    console.error("❌ Error obteniendo almacenes:", err.message);
    return res.status(500).json({ error: "Error obteniendo almacenes" });
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
    return res.json(almacenes);
  } catch (err) {
    console.error("❌ Error obteniendo almacenes activos:", err.message);
    return res
      .status(500)
      .json({ error: "Error obteniendo almacenes activos" });
  }
};

/**
 * Controlador para obtener el almacen cuyo nombre coincide con el requerido.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerAlmacenNombre = async (req, res) => {
  try {
    const { nombre } = req.params;

    console.log("🔍 Obteniendo almacen por nombre");
    const almacen = await Almacen.obtenerPorNombre(nombre);

    if (almacen.length === 0) {
      console.log("❌ Almacen no encontrado:", nombre);
      return res.status(404).json({ error: "Almacen no encontrado" });
    }

    console.log("✅ Almacen obtenido:", almacen);
    return res.status(200).json(almacen);
  } catch (err) {
    console.error("❌ Error obteniendo almacenes por nombre:", err.message);
    return res
      .status(500)
      .json({ error: "Error obteniendo almacenes por nombre" });
  }
};

/**
 * Controlador para modificar el nombre de un almacén.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const modificarAlmacen = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;

    console.log("🔍 Modificando el almacen con id " + id);

    const almacenes = await Almacen.modificarAlmacen(id, nombre);
    console.log("✅ Almacenes obtenidos:", almacenes);
    return res.json(almacenes);
  } catch (err) {
    console.error("❌ Error obteniendo almacenes activos:", err.message);
    return res
      .status(500)
      .json({ error: "Error obteniendo almacenes activos" });
  }
};

/**
 * Controlador para modificar el atributo activo de un almacén.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const modificarActivoAlmacen = async (req, res) => {
  try {
    const { id } = req.params;
    const { activo } = req.body;

    console.log("🔍 Modificando el estado del almacen con id " + id);

    await Almacen.modificarActivoAlmacen(id, activo);

    // ✅ Aquí devuelves una respuesta al cliente
    return res.status(200).json({
      message: `Estado del almacén ${id} actualizado a ${activo}`,
    });
  } catch (err) {
    console.error(
      "❌ Error obteniendo modificando el campo activo del almacen:",
      err.message
    );
    return res.status(500).json({
      error: "Error obteniendo modificando el campo activo del almacen",
    });
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

    return res.json(almacenCreado);
  } catch (err) {
    console.error("❌ Error insertando almacén:", err.message);
    return res.status(500).json({ error: "Error insertando almacén" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerAlmacenes,
  obtenerAlmacenPorId,
  obtenerAlmacenesActivos,
  modificarAlmacen,
  modificarActivoAlmacen,
  obtenerAlmacenNombre,
  crearAlmacen,
};
