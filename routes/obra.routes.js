// Importar Express y crear un enrutador
const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de obras
const { obtenerObras, crearObra } = require("../controllers/obra.controller");

// Ruta para obtener todas las obras
router.get("/", obtenerObras);

// Ruta para crear una nueva obra
router.post("/", crearObra);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
