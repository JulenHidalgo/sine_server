/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

/**
 * Rutas para el historial de productos.
 * @module routes/historialProductos
 */

const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de historial de productos
const {
  obtenerTodos,
  obtenerPorMatricula,
  obtenerPorId,
} = require("../controllers/historialProductos.controller");

/**
 * GET /
 * Obtiene todos los registros del historial de productos.
 * @route GET /historial
 */
router.get("/", obtenerTodos);

/**
 * GET /matricula/:matricula
 * Obtiene los registros del historial filtrados por matrícula del producto.
 * @route GET /historial/matricula/:matricula
 * @param {string} matricula - Matrícula del producto.
 */
router.get("/matricula/:matricula", obtenerPorMatricula);

/**
 * GET /id/:id
 * Obtiene un registro específico del historial por su ID.
 * @route GET /historial/id/:id
 * @param {number} id - ID del historial.
 */
router.get("/id/:id", obtenerPorId);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
