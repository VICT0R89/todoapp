# 📝 ToDo App — Pila MERN

Aplicación web full stack para gestionar tareas diarias. Permite a los usuarios crear, editar, marcar como completadas y eliminar tareas.  
Desarrollada como parte de mi portfolio para practicar la pila **MERN**: **MongoDB**, **Express.js**, **React**, y **Node.js**.

---

## 🚀 Funcionalidades principales

- ✅ Registro e inicio de sesión de usuario
- ✅ Crear nuevas tareas
- ✅ Editar tareas existentes
- ✅ Marcar tareas como completadas o pendientes
- ✅ Eliminar tareas
- ✅ Filtros por estado de tarea

---

## 🧩 Tecnologías usadas

- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Node.js, Express.js
- **Base de datos:** MongoDB Atlas (cloud)
- **Autenticación:** JWT
- **Despliegue:** Vercel (frontend) + Render/Fly.io (backend) + MongoDB Atlas

---

## ⚙️ Instalación local

1. **Clona el repositorio**

```bash
git clone https://github.com/VICT0R89/todoapp.git
cd todoapp
```

2. **Instala dependencias del servidor**

```bash
cd server
npm install
```

3. **Instala dependencias del cliente**

```bash
cd client
npm install
```

4. **Configura variables de entorno**

Crea un archivo .env dentro de /server con tu conexión a MongoDB Atlas y tu clave secreta para JWT:

```
MONGO_URI=
JWT_SECRET=
```

5. **Ejecuta servidor**

```bash
cd server
npm run dev
```

6. **Ejecuta cliente**

```bash
cd client
npm run dev
```

## 📡 Despliegue
**Este proyecto está pensado para desplegarse gratuitamente usando:**

**Frontend:** Vercel

**Backend:** Render o Fly.io

**Base de datos:** MongoDB Atlas

Cuando el despliegue esté activo, agregaré los enlaces aquí para acceso directo.

## ✨ Autor
Desarrollado por **Víctor Gutiérrez.**
Este proyecto forma parte de mi **portfolio** como **desarrollador web full stack.**