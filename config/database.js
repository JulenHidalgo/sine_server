const mysql = require("mysql2");
require("dotenv").config();

// Crear un pool de conexiones para evitar que la conexión se cierre
const pool = mysql.createPool({
  host: process.env.MYSQLHOST, // Host proporcionado por Railway
  port: process.env.MYSQLPORT, // Puerto de MySQL en Railway
  user: process.env.MYSQLUSER, // Usuario de la BD
  password: process.env.MYSQLPASSWORD, // Contraseña de la BD
  database: process.env.MYSQLDATABASE, // Nombre de la base de datos
  waitForConnections: true, // Espera si las conexiones están ocupadas
  connectionLimit: 10, // Número máximo de conexiones simultáneas
  queueLimit: 0, // Sin límite de cola de conexiones
});

// Convertir el pool a Promesas para evitar errores de estado
const db = pool.promise();

console.log("✅ Conexión a MySQL establecida correctamente.");

module.exports = db;
