const Usuario_producto = require("../models/usuario_producto.model");

// Obtener todas las entradas en usuario_producto
const obtenerUsuario_productos = (req, res) => {
  Usuario_producto.obtenerTodos((err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error obteniendo las entradas de usuario_producto" });
    }
    res.json(results);
  });
};
// Obtener todas las entradas en usuario_producto
const obtenerUsuario_productoPorMatricula = (req, res) => {
  const { producto_matricula } = req.params;
  const usuario_producto = new Usuario_producto(
    null,
    producto_matricula,
    null,
    null
  );
  Usuario_producto.obtenerPorMatricula(usuario_producto, (err, results) => {
    if (err) {
      return res.status(500).json({
        error:
          "Error obteniendo las entradas de usuario_producto por matricula",
      });
    }
    res.json(results);
  });
};

// Crear una nueva entrada en usuario_producto
const crearUsuario_producto = (req, res) => {
  const { usuario_id, producto_matricula, estado, fecha } = req.body;
  if (!usuario_id || !producto_matricula || !estado || !fecha) {
    return res.status(400).json({ error: "Faltan datos en usuario_producto" });
  }
  const usuario_producto = new Usuario_producto(
    usuario_id,
    producto_matricula,
    estado,
    fecha
  );
  Usuario_producto.crear(usuario_producto, (err, usuario_productoCreado) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error insertando usuario_producto" });
    }
    res.json(usuario_productoCreado);
  });
};

module.exports = {
  obtenerUsuario_productos,
  crearUsuario_producto,
  obtenerUsuario_productoPorMatricula,
};
