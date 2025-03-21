const express = require("express");
const router = express.Router();
const {
  obtenerTodos,
  obtenerPorMatricula,
  obtenerPorId,
} = require("../controllers/historialProductos.controller");

// Obtener todas las obras
router.get("/", obtenerTodos);

router.get("/matricula/:matricula", obtenerPorMatricula);

router.get("/id/:id", obtenerPorId);

module.exports = router;
