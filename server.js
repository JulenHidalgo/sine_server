/**
 *
 * Autor: JulenHidalgo
 * GitHub: https://github.com/JulenHidalgo/
 *
 * Punto de entrada principal del servidor Express.
 * Configura middlewares, rutas y lanza el servidor.
 *
 * Variables de entorno necesarias:
 * - PORT
 *
 * @module server
 * @requires express
 * @requires cors
 * @requires dotenv
 */

// Cargar las variables de entorno desde el archivo .env
require("dotenv").config();

// Importar los módulos necesarios
const express = require("express");
const cors = require("cors");

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto desde las variables de entorno o usar 3000 por defecto
const PORT = process.env.PORT || 3000;

// Configurar CORS para permitir solicitudes desde cualquier origen
app.use(
  cors({
    origin: "*", // Permitir acceso desde cualquier dominio
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeceras permitidas
  })
);

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());

// Importar y usar las rutas de cada módulo
const usuarioRoutes = require("./routes/usuario.routes");
app.use("/usuario", usuarioRoutes);

const obraRoutes = require("./routes/obra.routes");
app.use("/obra", obraRoutes);

const almacenRoutes = require("./routes/almacen.routes");
app.use("/almacen", almacenRoutes);

const productoRoutes = require("./routes/producto.routes");
app.use("/producto", productoRoutes);

const usuario_productoRoutes = require("./routes/usuario_producto.routes");
app.use("/usuario_producto", usuario_productoRoutes);

const historialRoutes = require("./routes/historialProductos.routes");
app.use("/historial", historialRoutes);

// Ruta raíz para comprobar que el servidor está funcionando
app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor funcionando correctamente" });
});

// Iniciar el servidor en todas las interfaces de red
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
