# sistema-de-administracion-de-tareas
Por: Alan Elizalde Hernández 5IV7
Introducción a los sistemas distribuidos
Programa de prueba: https://administrador-de-tareas-eha.herokuapp.com/iniciar-sesion
Instrucciones para correr el programa en local
Primero deberas hacer uso de git clone "Link del repositorio que genera github"
Ahora deberás abrir la carpeta que genera "git clone" y modificar el package.json
Deberas cambiar el "name" por el nombre de la carpeta que genera "git clone"
Deberas de usar npm i para que genere todas las carpetas de node_modules
Crea una base de datos vacia con un nombre cualquiera
Ahora, tienes que crear el archivo variables.env para poder correr el programa de forma local
En el archivo variables.env debe venir lo siguiente
BD_NOMBRE="Nombre de la base de datos"
BD_USER="Usuario de tu base de datos"
BD_PASS="Contraseña de tu base de datos"
BD_HOST="127.0.0.1" Esto es para que corrar en el localhost 3000
Ahora abre la consola y escribe npm run desarrollo
Listo ahora puedes correr tu programa