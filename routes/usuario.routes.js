/**
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 */

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
  obtenerUsuarioNombre,
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
 * GET /activos
 * Comprueba si existe un usuario con el nombre proporcionado.
 * Si existe, devuelve un codigo 200.
 * Si no existe, devuelve un codigo 404.
 * @route GET /usuario/existe/:nombre
 * @param {string} nombre - Nombre de usuario.
 */
router.get("/existe/:nombre", obtenerUsuarioNombre);

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
