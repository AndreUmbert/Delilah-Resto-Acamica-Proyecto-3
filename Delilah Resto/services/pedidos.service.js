//haciendolo con notacion modular con funciones
const { Pedidos, Productos, Usuarios, FormasPago, PedidosHasProductos } = require('./../models');

//Esto es un closure (es una funcion que retorna un objeto de funciones)
const PedidosService = () => {
    //las cargo desde el index porque es un patron decorador
    //si traigo pedidos desde pedidos, no traigo sus relaciones
    const traerPedidos = async () => {
        return await Pedidos.findAll({
            include: [
                { model: Productos },
                { model: Usuarios, attributes: ["nombre", "direccion"] },
                { model: FormasPago, attributes: ["nombre"] },
            ],
        });
    };

    const crearPedido = async (formas_pago_id, productos, Usuarios_id) => {
        const productos_data = await Promise.all(
            productos.map(async (prod) => {
                const productoDB = await Productos.findByPk(prod.id);
                return {
                    cantidad: prod.cantidad,
                    precio: productoDB.precio,
                    id: productoDB.id,
                };
            })
        );

        const date = new Date(Date.now());

        const precioTotal = productos_data.reduce((acc, prod) => {
            return (acc += prod.cantidad * parseFloat(prod.precio));
        }, 0);

        const nuevoPedido = await Pedidos.create({
            fecha: date,
            precio_total: precioTotal,
            Usuarios_id: Usuarios_id,
            formas_pago_id: formas_pago_id,
        });

        await Promise.all(
            productos_data.map(async (prod) => {
                await PedidosHasProductos.create(
                    {
                        pedidos_id: nuevoPedido.id,
                        productos_id: prod.id,
                        cantidad: prod.cantidad,
                    },
                    { fields: ["pedidos_id", "productos_id", "cantidad"] }
                );
            })
        );

    };

    return { traerPedidos, crearPedido }
}

module.exports = PedidosService();