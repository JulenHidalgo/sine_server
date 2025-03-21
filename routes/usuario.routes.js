// Importar Express y crear un enrutador
const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de usuarios
const {
  obtenerUsuarios,
  obtenerUsuariosActivos,
  modificarEstadoUsuario,
  crearUsuario,
} = require("../controllers/usuario.controller");

// Ruta para obtener todos los usuarios
router.get("/", obtenerUsuarios);

// Ruta para obtener únicamente los usuarios activos
router.get("/activos", obtenerUsuariosActivos);

// Ruta para modificar el estado de un usuario (activar o desactivar)
// Se identifica al usuario por su ID en la URL
router.put("/:id", modificarEstadoUsuario);

// Ruta para crear un nuevo usuario
router.post("/", crearUsuario);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
