const express = require("express");
const router = express.Router();
const {
  obtenerUsuario_productos,
  crearUsuario_producto,
  obtenerUsuario_productoPorMatricula,
} = require("../controllers/usuario_producto.controller");

// Obtener todos los usuarios
router.get("/", obtenerUsuario_productos);

// Obtener solo los usuarios activos
router.get("/:producto_matricula", obtenerUsuario_productoPorMatricula);

// Crear un nuevo usuario
router.post("/", crearUsuario_producto);

module.exports = router;
