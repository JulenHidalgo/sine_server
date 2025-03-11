const Obra = require("../models/obra.model");

// Obtener todas las obras
const obtenerObras = (req, res) => {
  Obra.obtenerTodos((err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error obteniendo obras" });
    }
    res.json(results);
  });
};

// Crear una nueva obra
const crearObra = (req, res) => {
  const { ot, descripcion } = req.body;
  if (!ot) {
    return res.status(400).json({ error: "Faltan datos en la obra" });
  }

  const obra = new Obra(ot, descripcion);

  if (!descripcion || descripcion == "") {
    obra.descripcion = "No se ha introducido una descripción para esta obra";
  }
  Obra.crear(obra, (err, obraCreada) => {
    if (err) {
      return res.status(500).json({ error: "Error insertando almacen" });
    }
    res.json(obraCreada);
  });
};

module.exports = {
  obtenerObras,
  crearObra,
};
