// Importar Express y crear un enrutador
const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de usuario_producto
const {
  obtenerUsuario_productos,
  crearUsuario_producto,
  obtenerUsuario_productoPorMatricula,
} = require("../controllers/usuario_producto.controller");

// Ruta para obtener todos los registros de usuario-producto
router.get("/", obtenerUsuario_productos);

// Ruta para obtener los registros filtrados por matrícula del producto
// Se pasa la matrícula como parámetro en la URL
router.get("/:producto_matricula", obtenerUsuario_productoPorMatricula);

// Ruta para crear un nuevo registro de usuario-producto
router.post("/", crearUsuario_producto);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
