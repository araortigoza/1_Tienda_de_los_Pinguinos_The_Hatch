# Tienda de los Pinguinos 🐧

Proyecto full-stack inspirado en Club Penguin. Dos servidores separados: un Panel de Administracion para gestionar productos y pedidos, y una Tienda Online para que los pinguinos adopten puffles y compren puffle food. Sin una sola linea de JavaScript en el navegador.

## Estructura del proyecto

```
tienda_de_los_pinguinos/
  backend/     -> Panel de Administracion (puerto 5000)
  frontend/    -> Tienda Online (puerto 5001)
```

Cada carpeta es un servidor independiente, con su propio `package.json` y su propia conexion a MongoDB (ambos apuntan a la misma base de datos).

## Requisitos previos

- Node.js instalado
- MongoDB corriendo localmente en `mongodb://127.0.0.1:27017`

## Configuracion inicial

### 1. Backend (Panel de Administracion)

```
cd backend
npm install
```

Creá la carpeta donde se van a guardar las imagenes de los productos (si no existe):

```
mkdir public/uploads
```

Como el panel es de acceso restringido, no hay registro por formulario. El script para crear el usuario administrador no está incluido en el repositorio, así que hay que crearlo a mano una sola vez:

1. Dentro de `backend`, creá un archivo `admin.js` que se conecte a la base de datos, hashee una contraseña con `bcrypt` y guarde un usuario nuevo usando el modelo `User` (`models/userModel.js`) con `role: "admin"`.
2. Corrélo una sola vez con `node admin.js`.

> Este archivo queda excluido del control de versiones (`.gitignore`), así que cada persona que clone el repositorio debe crear su propia versión siguiendo estos pasos.

Levantá el servidor:

```
node serverAdmin.js
```

El Panel de Administracion queda disponible en `http://localhost:5000`.

### 2. Frontend (Tienda Online)

En otra terminal:

```
cd frontend
npm install
node serverStore.js
```

La Tienda queda disponible en `http://localhost:5001`.

> Las imagenes de los productos se suben desde el Panel de Administracion y se sirven tambien en la Tienda, asi que conviene tener el backend corriendo (o al menos haber cargado productos alguna vez) antes de probar la tienda.

## Uso

### Panel de Administracion (`http://localhost:5000`)

- Login con el usuario creado en `admin.js`.
- CRUD completo de productos (crear, editar, eliminar) usando rutas REST reales (GET, POST, PUT, DELETE) mediante `method-override`.
- Eliminar un producto no lo borra de la base de datos: lo marca como inactivo y deja de mostrarse en la tienda.
- Visualizacion de todos los pedidos realizados por los pinguinos, con opcion de marcarlos como pendiente o entregado.
- Sesion protegida con `express-session` y contraseñas hasheadas con `bcrypt`.

### Tienda Online (`http://localhost:5001`)

- Muestra los puffles disponibles para adoptar (gratis) y la puffle food disponible para comprar.
- Los productos sin stock no se muestran.
- Carrito simple basado en sesion de servidor: agregar productos y finalizar pedido con nombre, direccion del iglu y telefono.
- Al confirmar el pedido, se descuenta el stock automaticamente.

## Tecnologias

- Node.js + Express
- MongoDB + Mongoose
- Pug (renderizado 100% en servidor, sin JavaScript en el cliente)
- express-session (sesiones y carrito)
- bcrypt (hasheo de contraseñas)
- multer (subida de imagenes de productos)
- method-override (rutas PUT y DELETE reales desde formularios HTML)

## Notas

- Los dos servidores usan nombres de cookie distintos (`admin.sid` y `store.sid`) para no pisarse entre si al correr ambos en `localhost`.
- Las sesiones usan `MemoryStore`, por lo que se pierden si se reinicia el servidor correspondiente.
