/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

/**
 * Rutas para la gestión de productos.
 * @module routes/producto
 */

const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de productos
const {
  obtenerProductos,
  crearProducto,
  modificarObservacionesProducto,
} = require("../controllers/producto.controller");

/**
 * GET /
 * Obtiene todos los productos registrados.
 * @route GET /producto
 */
router.get("/", obtenerProductos);

/**
 * PUT /:id
 * Modifica las observaciones de un producto identificado por su matrícula.
 * @route PUT /producto/:id
 * @param {string} matricula - Matrícula del producto.
 */
router.put("/:id", modificarObservacionesProducto);

/**
 * POST /
 * Crea un nuevo producto.
 * @route POST /producto
 */
router.post("/", crearProducto);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
