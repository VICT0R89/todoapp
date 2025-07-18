# API ToDo App

## Autenticación

### POST /api/auth/register  
Registra un nuevo usuario.  
**Body:**
```json
{  
  "name": "Example",  
  "email": "example@example.com",  
  "password": "tu_password"  
}
```
**Respuesta:** 201 Created  
```json
{  
  "_id": "user_id",  
  "name": "Example",  
  "email": "example@example.com",  
  "token": "jwt_token"  
}
```

### POST /api/auth/login  
Login de usuario.  
**Body:**
```json
{  
  "email": "example@example.com",  
  "password": "tu_password"  
}
```
**Respuesta:** 200 OK
```json
{  
  "_id": "user_id",  
  "name": "Example",  
  "email": "example@example.com",  
  "token": "jwt_token"  
}
```

---

## Tareas (Tasks)

> Todos los endpoints requieren el header: Authorization: Bearer <token>

### GET /api/tasks  
Obtiene todas las tareas del usuario.  
**Respuesta:** 200 OK
```json
[  
  {  
    "_id": "task_id",  
    "title": "Comprar pan",  
    "description": "Para el desayuno",  
    "completed": false,  
    "user": "user_id",  
    "createdAt": "2025-07-18T12:00:00Z",  
    "updatedAt": "2025-07-18T12:00:00Z"  
  }  
]
```

### POST /api/tasks  
Crea una nueva tarea.  
**Body:**
```json
{  
  "title": "Nueva tarea",  
  "description": "Detalles opcionales"  
}
```
**Respuesta:** 201 Created
```json
{  
  "_id": "task_id",  
  "title": "Nueva tarea",  
  "description": "Detalles opcionales",  
  "completed": false,  
  "user": "user_id",  
  "createdAt": "2025-07-18T12:00:00Z",  
  "updatedAt": "2025-07-18T12:00:00Z"  
}
```

### PUT /api/tasks/:id  
Actualiza una tarea existente.  
**Body** (puede incluir cualquiera de estos campos):
```json
{  
  "title": "Título actualizado",  
  "description": "Descripción actualizada",  
  "completed": true  
}
```
**Respuesta:** 200 OK (tarea actualizada)

### DELETE /api/tasks/:id  
Elimina una tarea.  
**Respuesta:** 200 OK
```json
{  
  "message": "Tarea eliminada correctamente"  
}
```

---

## Modelos de datos

### User  
| Campo    | Tipo     | Descripción                      |  
|----------|----------|--------------------------------|  
| _id      | ObjectId | ID único generado por MongoDB   |  
| name     | String   | Nombre del usuario              |  
| email    | String   | Email único                    |  
| password | String   | Hash de la contraseña           |  

### Task  
| Campo      | Tipo      | Descripción                         |  
|------------|-----------|-----------------------------------|  
| _id        | ObjectId  | ID único                          |  
| title      | String    | Título de la tarea (obligatorio)  |  
| description| String    | Descripción opcional               |  
| completed  | Boolean   | Estado de la tarea (false por defecto) |  
| user       | ObjectId  | Referencia al usuario propietario  |  
| createdAt  | Date      | Fecha de creación                  |  
| updatedAt  | Date      | Fecha de última actualización      |
