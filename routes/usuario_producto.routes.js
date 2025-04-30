/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

/**
 * Rutas para la gestión de usuario-producto.
 * @module routes/usuario_producto
 */

const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de usuario_producto
const {
  obtenerUsuario_productos,
  crearUsuario_producto,
  obtenerUsuario_productoPorMatricula,
} = require("../controllers/usuario_producto.controller");

/**
 * GET /
 * Obtiene todos los registros de relación usuario-producto.
 * @route GET /usuario_producto
 */
router.get("/", obtenerUsuario_productos);

/**
 * GET /:producto_matricula
 * Obtiene los registros de usuario-producto filtrados por matrícula del producto.
 * @route GET /usuario_producto/:producto_matricula
 * @param {string} producto_matricula - Matrícula del producto.
 */
router.get("/:producto_matricula", obtenerUsuario_productoPorMatricula);

/**
 * POST /
 * Crea un nuevo registro de usuario-producto.
 * @route POST /usuario_producto
 */
router.post("/", crearUsuario_producto);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
