// Importar el modelo Producto
const Producto = require("../models/producto.model");

// Controlador para obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    console.log("🔍 Obteniendo todos los productos...");
    const productos = await Producto.obtenerTodos();
    console.log("✅ Productos obtenidos:", productos);
    res.json(productos);
  } catch (err) {
    console.error("❌ Error obteniendo productos:", err.message);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
};

// Controlador para crear un nuevo producto
const crearProducto = async (req, res) => {
  try {
    console.log("🔍 Recibiendo datos en req.body:", req.body);

    const { id, matricula, observaciones, almacen_id, obra_ot } = req.body;

    // Verificar que los campos obligatorios estén presentes
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

    res.json(productoCreado);
  } catch (err) {
    console.error("❌ Error insertando producto:", err.message);
    res.status(500).json({ error: "Error insertando producto" });
  }
};

// Controlador para modificar las observaciones de un producto
const modificarObservacionesProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { observaciones } = req.body;

    console.log(
      "🔍 Modificando observaciones de producto con matrícula:",
      matricula,
      "Nueva observación:",
      observaciones
    );

    // Validar que se haya enviado una observación válida
    if (!observaciones || observaciones.trim() === "") {
      console.log("❌ Error: No se envió una observación válida.");
      return res.status(400).json({ error: "Faltan datos (observaciones)" });
    }

    // Llamar al modelo para realizar la modificación
    const resultado = await Producto.modificar({
      id,
      matricula,
      observaciones,
    });

    // Verificar si el producto fue encontrado
    if (!resultado) {
      console.log("❌ Producto no encontrado:", matricula);
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    console.log("✅ Producto actualizado correctamente.");
    res.json({ mensaje: "Producto actualizado", producto: resultado });
  } catch (err) {
    console.error("❌ Error modificando producto:", err.message);
    res.status(500).json({ error: "Error modificando producto" });
  }
};

// Exportar los controladores
module.exports = {
  obtenerProductos,
  crearProducto,
  modificarObservacionesProducto,
};
