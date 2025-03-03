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

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor funcionando correctamente 🚀" });
});

// Iniciar el servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en http://${getLocalIP()}:${PORT}`);
});

// Función para obtener la IP local
function getLocalIP() {
  const os = require("os");
  const interfaces = os.networkInterfaces();
  for (let name in interfaces) {
    for (let iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}
