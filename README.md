# SINE Server

Servidor backend desarrollado en **Node.js** para el proyecto SINE, encargado de la gestión de información sobre bobinas de madera.  
Este servidor permite registrar, actualizar y consultar datos sobre la ubicación, el estado y el historial de las bobinas.  
Ha sido desarrollado por **JulenHidalgo** durante su periodo de prácticas en la empresa **HodeiCloud**, cumpliendo con los requerimientos de la empresa cliente.

**GitHub:** https://github.com/JulenHidalgo/

---

## ⚙️ Configuración necesaria

> Este proyecto requiere un archivo `.env` que **no** está incluido en el repositorio por motivos de seguridad.  
> Debes crearlo manualmente en la raíz del proyecto.

### 📄 1. Crear archivo `.env`

En la raíz del proyecto, crea un archivo llamado:

```
.env
```

Y añade la siguiente estructura:

```env
DB_HOST=            # Host de la base de datos
DB_PORT=            # Puerto de la base de datos
DB_USER=            # Usuario de la base de datos
DB_PASSWORD=        # Contraseña de acceso a la base de datos
DB_NAME=            # Nombre de la base de datos
```

> Sustituye cada valor por tus credenciales reales.

---

## 🚀 Instalación y ejecución

1. Clona este repositorio:

```bash
git clone https://github.com/JulenHidalgo/SINE_Server.git
cd SINE_Server
```

2. Instala las dependencias:

```bash
npm install
```

3. Ejecuta el servidor:

```bash
npm start
```

O si usas `nodemon`:

```bash
npm run dev
```

El servidor se iniciará en `http://localhost:3000` (o el puerto que definas en tu archivo `.env`).

---

## 📂 Estructura del proyecto

```
SINE_Server/
├── controllers/           # Lógica de negocio para cada módulo
├── models/                # Modelos de datos
├── routes/                # Definición de rutas de la API
├── docs/                  # Documentación de la API (si aplica)
├── .env                   # Variables de entorno (ignorado)
├── server.js              # Punto de entrada del servidor
├── jsdoc.json             # Configuración de JSDoc (opcional)
└── README.md              # Este archivo
```

---

## 📱 Aplicaciones relacionadas

Este servidor se comunica con dos aplicaciones cliente desarrolladas también para el sistema SINE:

- **App de administración** (uso interno):  
  👉 https://github.com/MeylinM/SINE_AdminApp

- **App cliente** (uso general):  
  👉 https://github.com/MeylinM/SINE_APP

---

## 🛡️ Seguridad

- El archivo `.env` está excluido mediante `.gitignore` y nunca debe subirse.
- Asegúrate de no publicar credenciales ni datos sensibles.
