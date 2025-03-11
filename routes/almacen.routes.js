const express = require("express");
const router = express.Router();
const {
  obtenerAlmacenes,
  crearAlmacen,
} = require("../controllers/almacen.controller");

// Obtener todas las obras
router.get("/", obtenerAlmacenes);

// Crear una nueva obra
router.post("/", crearAlmacen);

module.exports = router;
