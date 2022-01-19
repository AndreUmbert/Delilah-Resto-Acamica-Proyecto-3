const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");
const Pedido = require("./pedido");
const Product = require("./product");
//1er parametro/argumento del sequelize.define es el nombre del modelo
const PedidoHasProduct = sequelize.define("pedidohasproduct", {
    //no hace falta establecer el ID
    //2do parametro del sequelize.define son las columnas
    cantidad: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },
    pedidoId: {
        field: 'pedidoId',
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: Pedido,
            key: 'id',
        }
    },
    productId: {
        field: 'productId',
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id',
        }
    },

}, {
    //3er parametro del del sequelize.define son otras opciones adicionales
    tableName: 'pedidohasproduct',
    timestamps: false, //esto es opcional si crean las columnas created_at y update_at (si estan creadas no ponemos nada porque eso seria true o le ponemos true si queremos)
});

//Se exporta el nombre de la variable y no el nombre del modelo. Ya que necesitamos una variable de JS
module.exports = PedidoHasProduct;