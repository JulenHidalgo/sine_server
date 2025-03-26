/**
 * Rutas para la gestión de almacenes.
 * @module routes/almacen
 */

const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de almacenes
const {
  obtenerAlmacenes,
  obtenerAlmacenPorId,
  obtenerAlmacenesActivos,
  modificarAlmacen,
  crearAlmacen,
} = require("../controllers/almacen.controller");

/**
 * GET /
 * Obtiene todos los almacenes registrados.
 * @route GET /almacen
 */
router.get("/", obtenerAlmacenes);

/**
 * GET /
 * Obtiene el almacen por id.
 * @route GET /almacen/:id
 */
router.get("/:id", obtenerAlmacenPorId);

/**
 * GET /
 * Obtiene todos los almacenes registrados con el campo activo a true.
 * @route GET /almacen/activos
 */
router.get("/activos", obtenerAlmacenesActivos);

/**
 * PUT /
 * Modifica el atributo nombre de un almacen.
 * @route PUT /almacen/:id
 */
router.put("/:id", modificarAlmacen);

/**
 * POST /
 * Crea un nuevo almacén.
 * @route POST /almacen
 */
router.post("/", crearAlmacen);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
