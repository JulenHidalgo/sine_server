const express = require("express");
const router = express.Router();
const {
  obtenerProductos,
  crearProducto,
  modificarObservacionesProducto,
} = require("../controllers/producto.controller");

// Obtener todos los productos
router.get("/", obtenerProductos);

// Modificar las observaciones de un producto
router.put("/:matricula", modificarObservacionesProducto);

// Crear un nuevo producto
router.post("/", crearProducto);

module.exports = router;
