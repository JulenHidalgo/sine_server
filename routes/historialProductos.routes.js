// Importar Express y crear un enrutador
const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de historial de productos
const {
  obtenerTodos,
  obtenerPorMatricula,
  obtenerPorId,
} = require("../controllers/historialProductos.controller");

// Ruta para obtener todos los registros del historial
router.get("/", obtenerTodos);

// Ruta para obtener registros filtrados por matrícula del producto
router.get("/matricula/:matricula", obtenerPorMatricula);

// Ruta para obtener un registro específico por su ID
router.get("/id/:id", obtenerPorId);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
