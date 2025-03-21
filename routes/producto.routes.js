// Importar Express y crear un enrutador
const express = require("express");
const router = express.Router();

// Importar las funciones del controlador de productos
const {
  obtenerProductos,
  crearProducto,
  modificarObservacionesProducto,
} = require("../controllers/producto.controller");

// Ruta para obtener todos los productos
router.get("/", obtenerProductos);

// Ruta para modificar las observaciones de un producto
// Se identifica el producto por su matrícula en la URL
router.put("/:matricula", modificarObservacionesProducto);

// Ruta para crear un nuevo producto
router.post("/", crearProducto);

// Exportar el enrutador para usarlo en la aplicación principal
module.exports = router;
