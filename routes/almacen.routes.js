// Importar Express y crear un enrutador
const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de almacenes
const {
  obtenerAlmacenes,
  crearAlmacen,
} = require("../controllers/almacen.controller");

// Ruta para obtener todos los almacenes
router.get("/", obtenerAlmacenes);

// Ruta para crear un nuevo almacén
router.post("/", crearAlmacen);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
