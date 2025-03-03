const express = require("express");
const router = express.Router();
const { obtenerObras, crearObra } = require("../controllers/obra.controller");

// Obtener todas las obras
router.get("/", obtenerObras);

// Crear una nueva obra
router.post("/", crearObra);

module.exports = router;
