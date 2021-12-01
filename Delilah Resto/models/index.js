const FormasPago = require("./formasPago");
const Pedidos = require("./pedidos");
const Productos = require("./productos");
const PedidosHasProductos = require("./pedidosHasProductos");
const Roles = require("./roles");
const Usuarios = require("./usuarios");

Usuarios.belongsTo(Roles, {
    foreignKey: "rol_id",
});

Usuarios.hasMany(Pedidos, {
    foreignKey: "Usuarios_id",
});

Pedidos.belongsTo(FormasPago, {
    foreignKey: "formas_pago_id",
});

Pedidos.belongsTo(Usuarios, {
    foreignKey: "Usuarios_id",
});

// Relacion de muchos a muchos
Pedidos.belongsToMany(Productos, {
    through: PedidosHasProductos
});

module.exports = {
    FormasPago,
    Pedidos,
    PedidosHasProductos,
    Productos,
    Roles,
    Usuarios,
};