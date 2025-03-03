const Producto = require("../models/producto.model");

// Obtener todos los productos
const obtenerProductos = (req, res) => {
  Producto.obtenerTodos((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error obteniendo productos" });
    }
    res.json(results);
  });
};

// Crear un nuevo usuario
const crearProducto = (req, res) => {
  const { matricula, observaciones, almacen_id, obra_ot } = req.body;
  if (!matricula || !almacen_id || !obra_ot) {
    return res.status(400).json({ error: "Faltan datos en el producto" });
  }

  const producto = new Producto(matricula, observaciones, almacen_id, obra_ot);
  Producto.crear(producto, (err, productoCreado) => {
    if (err) {
      return res.status(500).json({ error: "Error insertando producto" });
    }
    res.json(productoCreado);
  });
};

// Modificar el estado "activo" de un usuario
const modificarObservacionesProducto = (req, res) => {
  const { matricula } = req.params;
  const { observaciones } = req.body;

  if (!observaciones || observaciones === undefined) {
    return res.status(400).json({ error: "Faltan datos (observaciones)" });
  }
  const producto = new Producto(matricula, observaciones, null, null);
  Producto.modificar(producto, (err, resultado) => {
    if (err) {
      return res.status(500).json({ error: "Error modificando producto" });
    }
    res.json({ mensaje: "Producto actualizado", producto: resultado });
  });
};

module.exports = {
  obtenerProductos,
  crearProducto,
  modificarObservacionesProducto,
};
