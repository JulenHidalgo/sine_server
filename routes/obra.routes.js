/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

/**
 * Rutas para la gestión de obras.
 * @module routes/obra
 */

const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de obras
const { obtenerObras, crearObra } = require("../controllers/obra.controller");

/**
 * GET /
 * Obtiene todas las obras registradas.
 * @route GET /obra
 */
router.get("/", obtenerObras);

/**
 * POST /
 * Crea una nueva obra.
 * @route POST /obra
 */
router.post("/", crearObra);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
