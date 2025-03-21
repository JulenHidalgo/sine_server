// Importar la configuración de la base de datos
const db = require("../config/database");

// Definición de la clase Producto
class Producto {
  // Constructor para crear una instancia de Producto
  constructor(id, matricula, observaciones, almacen_id, obra_ot) {
    this.id = id;
    this.matricula = matricula;
    this.observaciones = observaciones;
    this.almacen_id = almacen_id;
    this.obra_ot = obra_ot;
  }

  // Método para convertir una fila de la base de datos en un objeto Producto
  static fromRow(row) {
    return new Producto(
      row.id,
      row.matricula,
      row.observaciones,
      row.almacen_id,
      row.obra_ot
    );
  }

  // Método para obtener todos los productos desde la base de datos
  static async obtenerTodos() {
    try {
      console.log("🔍 Ejecutando consulta: SELECT * FROM producto");
      const [rows] = await db.query("SELECT * FROM producto");
      console.log("✅ Productos encontrados:", rows);
      return rows;
    } catch (err) {
      console.error("❌ Error en la consulta SQL:", err.message);
      throw err;
    }
  }

  // Método para crear un nuevo producto en la base de datos
  static async crear(producto) {
    try {
      console.log("🔍 Insertando producto con matrícula:", producto.matricula);

      // Validación de los campos requeridos
      if (
        !producto.id ||
        !producto.matricula ||
        !producto.almacen_id ||
        !producto.obra_ot
      ) {
        console.log("❌ Error: Datos insuficientes.");
        throw new Error("Faltan datos en el producto.");
      }

      const sql =
        "INSERT INTO producto (id, matricula, observaciones, almacen_id, obra_ot) VALUES (?, ?, ?, ?, ?)";
      const [result] = await db.query(sql, [
        producto.id,
        producto.matricula,
        producto.observaciones || "",
        producto.almacen_id,
        producto.obra_ot,
      ]);

      console.log("✅ Producto insertado con matrícula:", producto.matricula);
      return { ...producto, id: result.insertId };
    } catch (err) {
      console.error("❌ Error insertando producto:", err.message);
      throw err;
    }
  }

  // Método para modificar las observaciones de un producto
  static async modificar(producto) {
    try {
      console.log(
        "🔍 Modificando producto con matrícula:",
        producto.matricula,
        "Nuevas observaciones:",
        producto.observaciones
      );

      // Validación de datos necesarios para la modificación
      if (!producto.id || !producto.matricula || !producto.observaciones) {
        console.log("❌ Error: Datos insuficientes.");
        throw new Error("Faltan datos (observaciones).");
      }

      const sql =
        "UPDATE producto SET observaciones = CONCAT(observaciones, ?) WHERE id = ?";
      const [result] = await db.query(sql, [
        "; " + producto.observaciones,
        producto.matricula,
      ]);

      // Verificar si se modificó algún registro
      if (result.affectedRows === 0) {
        console.log("❌ Producto no encontrado:", producto.matricula);
        return null;
      }

      console.log("✅ Producto actualizado correctamente.");
      return producto;
    } catch (err) {
      console.error("❌ Error modificando producto:", err.message);
      throw err;
    }
  }
}

// Exportar la clase para que pueda ser utilizada en otros módulos
module.exports = Producto;
