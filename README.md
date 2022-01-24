# Delilah Restó

---

# Descripción general:

El proyecto consta en crear el backend para un sistema de pedidos online para un restaurante, montando una REST API que permita realizar operaciones CRUD sobre una estructura de datos.

---

# Entregable:

El objetivo del Proyecto Delilah Restó es emular la tarea de un desarrollador backend.
Dichos archivos entregables son:
*Archivos JS.
*Archivo SQL sobre la estructura de los datos.
*Archivo de documentación.
*README.md (actualmente en lectura).

_Tener en cuenta_: El frotend no está incluido en el paquete de entegables ni los recursos de este proyecto otorgados por Acamica. El foco está puesto en el Backend.

---

# Uso de librerías:

No está permitido el uso de librerías, plugins o cualquier otro recurso que no esté especificado en esta guía, ya que el objetivo del proyecto es validar los conocimientos de base.

---

# Consignas:

A continuacion se detalla la guía de pasos seguidos para contruir el proyecto.

a. Método de evaluación de tu proyecto

La tarea de un/a evaluador/a es descargar tu proyecto e instalarlo siguiendo tus instrucciones del README.md.

El objetivo es validar que tu aplicación funcione en cualquier plataforma, por lo tanto el/la evaluador/a realizará todas las pruebas sobre su entorno local. Ten en cuenta este método para realizar tu desarrollo.

b. Preparación

Si todavía no los tienes, instala Node.js, MySQL y Postman.
Descarga los recursos del proyecto.
c. Puesta a punto

Paso 1: Introducción al proyecto

Entre los recursos que descargaste, analiza cada una de las vistas para entender el proyecto en su totalidad.
Observa con detenimiento cómo es el comportamiento de la aplicación y comienza a diagramar a grandes rasgos la arquitectura de la misma. Haz click aquí para ver el ejemplo.

Paso 2: Definiendo la especificación

En base a la información relevada, es momento de la documentación con Swagger bajo el estándar OpenAPI.
Crea un archivo spec.yml en el raíz de tu proyecto y completa el listado de endpoints.

Paso 3: Creando el entorno

Es momento de iniciar la carpeta con tu proyecto.
Crea una nueva carpeta en tu computadora, comienza con un repositorio de git, e inicializa tu proyecto de NodeJS creando el archivo package.json.
Instala las dependencias necesarias y crea tu servidor web.

Paso 4: Endpoints

Instala express en tu proyecto y comienza a definir todas las rutas que has especificado en tu documentación, recuerdo utilizar los métodos tipo GET, POST, PUT y DELETE dependiendo la acción que vayas a realizar.

Paso 5: Estructura de la información

El siguiente paso es armar tu base de datos para que soporte todo el flujo de la aplicación. Revisa nuevamente cada una de las vistas y diagrama cada tabla en base a la información que extraes de las vistas.
Al finalizar el análisis de todas las vistas tu primera versión del modelo de datos estará lista.

Paso 6 : Conexión a la base de datos

Extiende el código del servidor con la conexión a la base de datos. Al finalizar este paso deberías tener un servidor ‘escuchando’ en un puerto local, conectado a una base de datos MySQL.

d. Listado y creación de productos

Paso 1: Crea la tabla y estructura de productos

Ahora vas a crear la primera tabla del proyecto!
En base a la especificación creada anteriormente, crea la tabla de productos con las columnas requeridas para cumplir la especificación de la API.

Paso 2: CRUD de productos

Añade Express a tu proyecto, crea tu primer endpoint de /productos y genera las operaciones necesarias para poder crear, leer, actualizar y borrar un producto.
Tómate tu tiempo para ir probando y debugueando cada parte por separado.

Pro Tip: No dudes en usar la consola integrada en phpMyAdmin para probar tus consultas si es que tenés alguna duda.

e. Sistema de usuarios

Paso 1: Crea la tabla y estructura de usuarios

Confiamos en que ya tienes experiencia creando una nueva tabla. ¡La repetición convierte conceptos en saberes! En este paso debes crear la tabla de usuarios.

Paso 2: Registro y login de usuarios

Basándose en la especificación, crea el endpoint correspondiente para darle al usuario una forma de crear una nueva cuenta.
Lo siguiente es incorporar tus conocimientos sobre tokens JWT para darle a tus usuarios registrados una forma de iniciar sesión en la plataforma.

Paso 3: Agregar validación de roles

Por último, genera una estrategia de validación de roles para todos los endpoints existentes. Por ejemplo, que “solo usuarios administradores puedan crear, editar y eliminar productos, y que los usuarios logueados solo tengan acceso a su información personal”.

f. Creación de pedidos

Paso 1: Creando la tabla y estructura de pedidos

La tabla de pedidos se relaciona con dos tablas: la de usuarios y la de productos. Al crearla, ten en cuenta las siguientes condiciones:
*Un pedido puede ser realizado por un único usuario.
*Un usuario puede realizar más de un pedido.
*Un pedido puede contener varios productos.
*Un producto puede formar parte de varios pedidos.

Paso 2: Creando y obteniendo pedidos

Con las tablas ya creadas, genera el primer endpoint para la creación de los productos. Recuerda basarte en la especificación para saber qué vas a recibir y qué deberías devolver.
Ahora puedes crear un nuevo endpoint para hacer GET de todos los productos. Esta consulta no solo tiene que devolver el detalle de los pedidos sino también el detalle de todos los productos.
Es importante que el GET de todos los pedidos solo pueda ser ejecutado por un admin. Un usuario logueado solo debe recibir los propios.

Paso 3: Edición de pedidos

El último paso para finalizar la API es brindarle al admin herramientas de edición sobre los pedidos realizados para poder actualizar el estado de los mismos. Solo te falta crear un endpoint para hacer un UPDATE sobre la ruta de pedidos, que debería ser muy parecido al que ya creaste en el CRUD de productos.

---

# Condiciones para entregar el proyecto:

\*Archivos mínimos entregados: debes incluir como mínimo todos los archivos JS correspondientes al servidor de la API. Debes incluir el package.json con el listado de dependencias.

\*Estructura de base de datos: debes enviar un archivo con queries de base de datos requeridas para crear la base de la estructura de las tablas requeridas por el proyecto o un instalador que importe todos los datos necesarios en la base de datos.

\*Instrucciones para ejecución: debes incluir un README.md con pasos requeridos para inicializar el servidor. Incluye la configuración del servidor, instrucciones y archivos para poder tener la estructura base de la base de datos y cómo iniciar el servidor.

\*Documentación: archivo spec.yml con la documentación de tu API.

\*Enlace al proyecto sobre un repositorio: envía el enlace a tu proyecto sobre un repositorio. Si aún no tienes repositorio, crea tu usuario gratuito en GitHub, GitLab, Bitbucket o cualquier otra plataforma que trabaje con GIT.

---

# Condiciones para aprobar:

\*Condición 1: Poder registrar un nuevo usuario.

\*Condición 2: Un usuario debe poder listar todos los productos disponibles.

\*Condición 3: Un usuario debe poder generar un nuevo pedido al restaurante con un listado de platos que desea.

\*Condición 4: El usuario con roles de administrador debe poder actualizar el estado del pedido.

\*Condición 5: Un usuario con rol de administrador debe poder realizar las acciones de creación, edición y eliminación de recursos de productos (CRUD de productos).

\*Condición 6: Un usuario sin roles de administrador no debe poder crear, editar o eliminar un producto, ni editar o eliminar un pedido. Tampoco debe poder acceder a información de otros usuarios.

-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-

## INSTRUCCIONES DE EJECUCIÓN:

# Prender servidor:

Comenzaremos poniendo todo en marcha por lo tanto comenzaremos iniciando los programas que se requieren para la ejecución y luego iremos paso por paso hasta iniciar el servidor. Los pasos para inicializar el servidor son los siguientes:

1. Abrir Visual Studio Code y abrir la carpeta DELILAH-RESTO -> Delilah-Resto-Acamica-Proyecto-3, donde encontraremos el archivo ".env" que contendra los valores de las variables de entorno. Abrir dicho archivo en el editor de código.

2. Abrir MySQL Workbench y establecer una nueva conexión, donde pondremos el usuario, el ip y el puerto de la base de datos. Crear la conexión con dichos datos.

3.Abrir XAMPP y poner en funcionamiento MySQL desde el panel de control. Luego revisar que el puerto de la base de datos que aparece en el panel sea el 3306 (dado que es aquel que corresponde con las variables de entorno perteneciente al puerto de la base de datos).

4. Abrir la base de datos en MySQL Workbench.

5. Utilizar el archivo "DATABASE.sql" para la obtención de la estructura de los datos (tablas y relaciones) en MySQL Workbench.

6. Abrir una nueva terminal en el editor de código y en ella dirigirse a la direccion "D:\Proyectos Acamica Entregables\Delilah-Resto\Delilah-Resto-Acamica-Proyecto-3\Delilah Resto"

7. En dicha terminal ejecutar el comando "npm run start". Donde "start" es el script en el archivo "package.json" que nos permitira prender el servidor. Si el servidor se conecta correctamente debe mostrar los siguientes mensajes en consola:
   "mysql://root@127.0.0.1:3306/dellilah
   escuchando en puerto 3000
   Executing (default): SELECT 1+1 AS result
   todo Ok"

8. Abrir Postman para poder realizar todas los procesos CRUD de la API.

---

## CARPETAS:

Ire estableciendo información de lo que se encuentra dentro de cada carpeta y que sea de importancia, en orden de arbol y ramas. Cada carpeta sera inspeccionada de la siguiente manera:
"Carpeta tronco -> archivos contenidos en la carpeta -> carpetas ramas contenidas dentro de la carpeta tronco/rama anterior".

# DELILAH-RESTO:

"DATABASE.sql": Informacion de como estan estructuradas las tablas y las relaciones de la base de datos.

    # Delilah-Resto-Acamica-Proyecto-3:

    "delilahRestó.json y delilahRestó.yaml": Estos archivos contienen la documentación de la API realizado con la herramienta Swagger bajo el estandar OpenAPI. Contienen lo mismo pero en distintos tipos de archivos.

    "README.md": Archivo de texto que contiene informacion sobre el proyecto, sus consignas, requerimientos y modo de utilización.

        # Delilah Resto:

        ".env": Contiene las variables de entorno del proyecto y la palabra mágica (token de seguridad o JWT secreto).

        "package.json": Archivo vital del proyecto donde se han establecido scripts, dependencias y demas informacion importante.

        "package-lock.json": Archivo autogenerado luego de instalar las dependencias y instancias.

        "server.js": Archivo json principal del proyecto donde se encuentran los procesos CRUD, endpoints, instancia de express, uso de librerias y donde se levanta el servidor.Los endpoints que abarca son:

         "USUARIOS", donde encontraremos "/login" que es para que tanto usuarios y administradores puedan logearse y "/signup" donde nuevos usuarios (NO administradores) podrán crear una nueva cuenta brindando la informacion necesaria.

         "PRODUCTOS": donde tenemos "/productos" donde los usuarios pueden hacer un get a todos los productos de la API, luego "/productos/buscar/palabra/:palabraParam" donde remplazando palabraParam por otra, la API traera los productos que contengan esa palabra. Luego encontramos "/productos/buscar/:idPlato", que donde remplazaremos idPlato por un numero entero y la API nos otorgara informacion de dicho producto al cual corresponda ese valor númerico. Utilizando "/productos" en manera de "post" e incertando los valores requeridos se podra pushear un nuevo producto a la base de datos solo y en cuanto seas administrador y estes logeado. "/productos/update/:idProducto" permitira al administrador logeado actualizar/cambiar (realizar un put) la informacion de los productos en aquellas caracteristicas presentes en los replacements. El ultimo proceso crud de este endpoint es el delete. "/productos/delete/:idPlato", donde el administrador logeado podra eliminar un producto de la lista de la base de datos, pero hay que tener en consideracion que realizar esto solo romperia las relaciones, dichos productos en los cuales se tenga un pedido, tambien sera borrado dicho pedido que contenga al producto eliminado.

         "PEDIDOS": En "/pedidos" tanto usuarios como administradores podran hacer un post, es decir hacer un pedido, a la API. En cambio en "/pedidos/dashboard" los usuarios solo podran revisar los pedidos que ellos realizaron y los administradores podran ver todos los pedidos. En este tercer pathing para este endpoin el administrador podra cambiar el estado de un pedido accediendo a su id a traves de "/pedidos/update/:idPedido". Finalmente utilizando el path "/pedidos/delete/:idPedido", el administrador que se encuentre logeado podra remplazar el idPedido por un numero entero, dicho valor eliminara el pedido al que corresponda dicho valor que representa el id del pedido.

        # config:

            "db.js": En este archivo se realiza la conexion del código con la base de datos.

        # controlers:

            "adminVerification.js": Middleware encargado de verificacar que el usuario que esta intentando realizar algun proceso CRUD sea administrador. Si es administrador le otorgara permiso y si es usuario sera rechazado.

        # models:

            "index.js": Importa todos los modelos, establece las relaciones y las exporta.

            "paymentMethod.js, pedido.js, pedidoHasProduct.js, product.js, rol.js, usuario.js": Todos estos archivos seran tratados de la misma manera para no sobreextenderme, en cada uno de ellos se establecen los modelos de cada una de las tablas que conforman la estructura de los datos en la base trabajada, donde cada fila concuerda tanto en el modelo como en la base de datos para que corra perfectamente. Estan trabajadas con sequelize y son exportadas para luego trabajar con dichos modelos en el resto del proyecto.

        # services:

             "index.js": importa y exporta los servicios en un solo archivo para mayor facilidad.

             "pedido.service.js": Contiene los distintos servicios en si mismos, el de traerPedidos y el de crearPedido, dichos servicios son exportados al index.js y utilizados en el resto del proyecto.
