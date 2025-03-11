require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
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

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor funcionando correctamente" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
