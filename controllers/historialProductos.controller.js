const HistorialProductos = require("../models/historialProductos.model");

const obtenerTodos = (req, res) => {
  HistorialProductos.obtenerTodos((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error obteniendo la informacion" });
    }
    res.json(results);
  });
};

module.exports = {
  obtenerTodos,
};
