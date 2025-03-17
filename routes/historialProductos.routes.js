const express = require("express");
const router = express.Router();
const {
  obtenerTodos,
  obtenerPorMatricula,
} = require("../controllers/historialProductos.controller");

// Obtener todas las obras
router.get("/", obtenerTodos);

router.get("/:matricula", obtenerPorMatricula);

module.exports = router;
