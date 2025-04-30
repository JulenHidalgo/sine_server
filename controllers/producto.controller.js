/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

// Importar el modelo Producto
const Producto = require("../models/producto.model");

/**
 * @typedef {Object} Request
 * @description Objeto de solicitud HTTP (Express).
 */

/**
 * @typedef {Object} Response
 * @description Objeto de respuesta HTTP (Express).
 */

/**
 * Controlador para obtener todos los productos.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerProductos = async (req, res) => {
  try {
    console.log("🔍 Obteniendo todos los productos...");
    const productos = await Producto.obtenerTodos();
    console.log("✅ Productos obtenidos:", productos);
    return res.json(productos);
  } catch (err) {
    console.error("❌ Error obteniendo productos:", err.message);
    return res.status(500).json({ error: "Error obteniendo productos" });
  }
};

/**
 * Controlador para crear un nuevo producto.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const crearProducto = async (req, res) => {
  try {
    console.log("🔍 Recibiendo datos en req.body:", req.body);

    const { id, matricula, observaciones, almacen_id, obra_ot } = req.body;

    if (!id || !matricula || !almacen_id || !obra_ot) {
      console.log("❌ Error: Datos insuficientes.");
      return res.status(400).json({ error: "Faltan datos en el producto" });
    }

    console.log("🔍 Creando producto con matrícula:", matricula);
    const productoCreado = await Producto.crear({
      id,
      matricula,
      observaciones,
      almacen_id,
      obra_ot,
    });
    console.log("✅ Producto creado:", productoCreado);

    return res.json(productoCreado);
  } catch (err) {
    console.error("❌ Error insertando producto:", err.message);
    return res.status(500).json({ error: "Error insertando producto" });
  }
};

/**
 * Controlador para modificar las observaciones de un producto.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const modificarObservacionesProducto = async (req, res) => {
  try {
    const { id } = req.params; // Se usará `id` en lugar de `matricula`
    const { observaciones } = req.body;

    console.log(
      "🔍 Modificando observaciones de producto con ID:",
      id,
      "Nueva observación:",
      observaciones
    );

    if (!observaciones || observaciones.trim() === "") {
      console.log("❌ Error: No se envió una observación válida.");
      return res.status(400).json({ error: "Faltan datos (observaciones)" });
    }

    const resultado = await Producto.modificar(id, observaciones);

    if (!resultado) {
      console.log("❌ Producto no encontrado:", id);
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    console.log("✅ Producto actualizado correctamente.");
    return res.json({ mensaje: "Producto actualizado", producto: resultado });
  } catch (err) {
    console.error("❌ Error modificando producto:", err.message);
    return res.status(500).json({ error: "Error modificando producto" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerProductos,
  crearProducto,
  modificarObservacionesProducto,
};
