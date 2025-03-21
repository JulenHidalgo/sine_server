const db = require("../config/database");

class Producto {
  constructor(id, matricula, observaciones, almacen_id, obra_ot) {
    this.id = id;
    this.matricula = matricula;
    this.observaciones = observaciones;
    this.almacen_id = almacen_id;
    this.obra_ot = obra_ot;
  }

  // Método para mapear un objeto de la base de datos a la clase Producto
  static fromRow(row) {
    return new Producto(
      row.id,
      row.matricula,
      row.observaciones,
      row.almacen_id,
      row.obra_ot
    );
  }

  // ✅ Obtener todos los productos con async/await
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

  // ✅ Crear un nuevo producto con async/await
  static async crear(producto) {
    try {
      console.log("🔍 Insertando producto con matrícula:", producto.matricula);

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

  // ✅ Modificar observaciones de un producto con async/await
  static async modificar(producto) {
    try {
      console.log(
        "🔍 Modificando producto con matrícula:",
        producto.matricula,
        "Nuevas observaciones:",
        producto.observaciones
      );

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

module.exports = Producto;
