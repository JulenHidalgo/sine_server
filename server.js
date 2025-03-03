require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const usuariosRoutes = require("./routes/usuarios.routes");
app.use("/usuarios", usuariosRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor funcionando correctamente 🚀" });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
