const express = require("express");
const router = express.Router();
const {
  obtenerTodos,
} = require("../controllers/historialProductos.controller");

// Obtener todas las obras
router.get("/", obtenerTodos);

module.exports = router;
