const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

//1er parametro/argumento del sequelize.define es el nombre del modelo
const Usuarios = sequelize.define("usuario", {
    //no hace falta establecer el ID
    //2do parametro del sequelize.define son las columnas
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    //3er parametro del del sequelize.define son otras opciones adicionales
    tableName: 'usuario',
    timestamps: false, //esto es opcional si crean las columnas created_at y update_at (si estan creadas no ponemos nada porque eso seria true o le ponemos true si queremos)
});

//Se exporta el nombre de la variable y no el nombre del modelo. Ya que necesitamos una variable de JS
module.exports = Usuarios;