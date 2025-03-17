const mysql = require("mysql2");
require("dotenv").config();

// Verificar que las variables se están leyendo bien
console.log("🔍 Conectando a MySQL con:");
console.log("  Host:", process.env.MYSQLHOST);
console.log("  Puerto:", process.env.MYSQLPORT);
console.log("  Usuario:", process.env.MYSQLUSER);
console.log("  Base de Datos:", process.env.MYSQLDATABASE);

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = pool.promise();

console.log("✅ Conexión a MySQL establecida correctamente.");
module.exports = db;
