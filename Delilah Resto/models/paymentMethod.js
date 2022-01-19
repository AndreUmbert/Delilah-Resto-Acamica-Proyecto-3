const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");
//1er parametro/argumento del sequelize.define es el nombre del modelo
const paymentMethod = sequelize.define("paymentMethod", {
    //no hace falta establecer el ID
    //2do parametro del sequelize.define son las columnas
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    //3er parametro del del sequelize.define son otras opciones adicionales
    tableName: 'paymentMethod',
    timestamps: false, //esto es opcional si crean las columnas created_at y update_at (si estan creadas no ponemos nada porque eso seria true o le ponemos true si queremos)
});

//Se exporta el nombre de la variable y no el nombre del modelo. Ya que necesitamos una variable de JS
module.exports = paymentMethod;