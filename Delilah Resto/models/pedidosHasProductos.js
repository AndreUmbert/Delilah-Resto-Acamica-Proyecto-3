const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");
const Pedidos = require("./pedidos");
const Productos = require("./productos");
//1er parametro/argumento del sequelize.define es el nombre del modelo
const PedidosHasProductos = sequelize.define("pedidos_has_productos", {
    //no hace falta establecer el ID
    //2do parametro del sequelize.define son las columnas
    cantidad: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    pedidos_id: {
        field: 'pedidos_id',
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: Pedidos,
            key: 'id',
        }
    },
    productos_id: {
        field: 'productos_id',
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: Productos,
            key: 'id',
        }
    },

}, {
    //3er parametro del del sequelize.define son otras opciones adicionales
    tableName: 'pedidos_has_productos',
    timestamps: false, //esto es opcional si crean las columnas created_at y update_at (si estan creadas no ponemos nada porque eso seria true o le ponemos true si queremos)
    underscored: true,
});

//Se exporta el nombre de la variable y no el nombre del modelo. Ya que necesitamos una variable de JS
module.exports = PedidosHasProductos;