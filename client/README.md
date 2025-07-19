# 📝 ToDo App — Frontend React (Client)

Este es el frontend de la aplicación **ToDo App**, desarrollado con **React** y **Vite**, usando **TypeScript** y estilos con **TailwindCSS**.  

Forma parte del proyecto full stack para gestionar tareas diarias, que incluye backend en Node.js y MongoDB.

---

## 🚀 Funcionalidades principales

- ✅ Interfaz para registro e inicio de sesión de usuario  
- ✅ Visualización, creación, edición y eliminación de tareas  
- ✅ Marcado de tareas como completadas o pendientes  
- ✅ Filtros y búsqueda rápida de tareas  
- ✅ Diseño responsivo con TailwindCSS  

---

## 🧩 Tecnologías usadas

- **Framework:** React 19 (con TypeScript)  
- **Herramienta de construcción:** Vite  
- **Estilos:** TailwindCSS  
- **Estado y llamadas a API:** Fetch API y React Context
- **Despliegue:** Vercel (recomendado para frontend estático)  

---

## ⚙️ Instalación local

1. **Clonar repositorio y moverse al frontend**

```bash
git clone https://github.com/VICT0R89/todoapp.git
cd todoapp/client
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Ejecutar el frontend**

```bash
npm run dev
```

4. **Abrir en navegador**

El servidor de desarrollo arrancará en **http://localhost:5173** (o puerto que indique la consola).

## 📝 Configuración

No requiere variables de entorno propias en esta versión, la conexión con el backend debe configurarse apuntando a la URL correcta de la API (por defecto `localhost` con el puerto del backend).

Para producción, configurar la URL del backend en algún archivo de configuración o variables de entorno de Vite si fuera necesario.

---

## 📡 Despliegue

Se recomienda desplegar este frontend estático en **Vercel** para aprovechar su integración con proyectos React + Vite.

En producción, el backend y la base de datos deben estar desplegados en servicios como **Render**, **Fly.io** y **MongoDB Atlas**, respectivamente.

---

## ✨ Autor

Desarrollado por **Víctor Gutiérrez**.  
Forma parte del portfolio personal como **desarrollador web full stack**.
