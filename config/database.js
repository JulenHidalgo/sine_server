// Importar el cliente de MySQL con soporte para promesas
const mysql = require("mysql2");

// Cargar las variables de entorno desde el archivo .env
require("dotenv").config();

// Mostrar por consola los datos de conexión (excepto la contraseña por seguridad)
console.log("🔍 Conectando a MySQL con:");
console.log("  Host:", process.env.MYSQLHOST);
console.log("  Puerto:", process.env.MYSQLPORT);
console.log("  Usuario:", process.env.MYSQLUSER);
console.log("  Base de Datos:", process.env.MYSQLDATABASE);

// Crear un pool de conexiones a MySQL
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true, // Esperar si no hay conexiones disponibles
  connectionLimit: 10, // Número máximo de conexiones simultáneas
  queueLimit: 0, // Sin límite para la cola de conexiones en espera
});

// Obtener el pool en modo promesa para usar async/await
const db = pool.promise();

console.log("✅ Conexión a MySQL establecida correctamente.");

// Exportar el objeto de base de datos para usarlo en otros módulos
module.exports = db;
