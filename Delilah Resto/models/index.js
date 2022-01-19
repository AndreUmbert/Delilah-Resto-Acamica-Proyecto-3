const paymentMethod = require("./paymentMethod");
const Pedido = require("./pedido");
const Product = require("./product");
const PedidoHasProduct = require("./pedidoHasProduct");
const Rol = require("./rol");
const Usuario = require("./usuario");

Usuario.belongsTo(Rol, {
    foreignKey: "rolId",
});

Usuario.hasMany(Pedido, {
    foreignKey: "usuarioId",
});

Pedido.belongsTo(paymentMethod, {
    foreignKey: "paymentMethodId",
});

Pedido.belongsTo(Usuario, {
    foreignKey: "usuarioId",
});

// Relacion de muchos a muchos
Pedido.belongsToMany(Product, {
    through: PedidoHasProduct
});

module.exports = {
    paymentMethod,
    Pedido,
    PedidoHasProduct,
    Product,
    Rol,
    Usuario,
};