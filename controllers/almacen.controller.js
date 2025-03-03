const Almacen = require("../models/almacen.model");

// Obtener todos los almacenes
const obtenerAlmacenes = (req, res) => {
  Almacen.obtenerTodos((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error obteniendo almacenes" });
    }
    res.json(results);
  });
};

// Crear un nuevo almacen
const crearAlmacen = (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "Faltan datos en el almacen" });
  }
  const almacen = new Almacen(null, nombre);
  Almacen.crear(almacen, (err, almacenCreado) => {
    if (err) {
      return res.status(500).json({ error: "Error insertando almacen" });
    }
    res.json(almacenCreado);
  });
};

module.exports = {
  obtenerAlmacenes,
  crearAlmacen,
};
