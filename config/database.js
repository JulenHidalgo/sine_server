const mysql = require("mysql2");
require("dotenv").config();

// Verificar que está leyendo las variables de entorno correctamente
console.log("🔍 Conectando a MySQL con:");
console.log("  Host:", process.env.MYSQLHOST);
console.log("  Puerto:", process.env.MYSQLPORT);
console.log("  Usuario:", process.env.MYSQLUSER);
console.log("  Base de Datos:", process.env.MYSQLDATABASE);

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  port: process.env.MYSQLPORT || 3306,
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "",
  database: process.env.MYSQLDATABASE || "test",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Convertir a promesas para evitar errores de conexión cerrada
const db = pool.promise();

console.log("✅ Conexión a MySQL establecida correctamente.");
module.exports = db;
