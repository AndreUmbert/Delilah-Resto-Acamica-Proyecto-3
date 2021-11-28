//establecemos que tipo de base de datos vamos a usar
const { sequelize, Sequelize } = require("sequelize");
//Establecer las variables de entorno para la aplicacion
const { DB_USER, DB_NAME, DB_PORT, DB_SERVER, DB_PwD } = process.env;
//Hacer un string el cual se va a usar para que mi aplicacion corra en cualquier computadora (distintos ambientes es un "connection string")
const conString = `mysql://${DB_USER}${DB_PwD && `:${DB_PwD}`}@${DB_SERVER}:${DB_PORT}/${DB_NAME}`;
//Crear la conexion
const seq = new Sequelize(conString);
//Hacemos la autenticacion
seq
    .authenticate()
    .then(() => {
        console.log("todo Ok");
    })
    .catch((e) => {
        console.log(e);
    });
//exportamos como valor de este modulo, la conexion
module.exports = seq;

console.log(conString);