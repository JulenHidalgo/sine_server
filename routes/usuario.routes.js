const express = require("express");
const router = express.Router();
const {
  obtenerUsuarios,
  obtenerUsuariosActivos,
  modificarEstadoUsuario,
  crearUsuario,
} = require("../controllers/usuario.controller");

// Obtener todos los usuarios
router.get("/", obtenerUsuarios);

// Obtener solo los usuarios activos
router.get("/activos", obtenerUsuariosActivos);

// Modificar el estado de un usuario (activar/desactivar)
router.put("/:id", modificarEstadoUsuario);

// Crear un nuevo usuario
router.post("/", crearUsuario);

module.exports = router;
