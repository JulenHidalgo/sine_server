/**
 * Rutas para la gestión de usuarios.
 * @module routes/usuario
 */

const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de usuarios
const {
  obtenerUsuarios,
  obtenerUsuariosActivos,
  modificarEstadoUsuario,
  crearUsuario,
} = require("../controllers/usuario.controller");

/**
 * GET /
 * Obtiene todos los usuarios del sistema.
 * @route GET /usuario
 */
router.get("/", obtenerUsuarios);

/**
 * GET /activos
 * Obtiene únicamente los usuarios que están activos.
 * @route GET /usuario/activos
 */
router.get("/activos", obtenerUsuariosActivos);

/**
 * PUT /:id
 * Modifica el estado de un usuario (activo/inactivo) por ID.
 * @route PUT /usuario/:id
 * @param {number} id - ID del usuario.
 */
router.put("/:id", modificarEstadoUsuario);

/**
 * POST /
 * Crea un nuevo usuario.
 * @route POST /usuario
 */
router.post("/", crearUsuario);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
