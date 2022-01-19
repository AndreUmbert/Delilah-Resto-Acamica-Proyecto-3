//haciendolo con notacion modular con funciones
const { Pedido, Product, Usuario, paymentMethod, PedidoHasProduct } = require('../models');

//Esto es un closure (es una funcion que retorna un objeto de funciones)
const PedidosService = () => {
    //las cargo desde el index porque es un patron decorador
    //si traigo pedidos desde pedidos, no traigo sus relaciones
    const traerPedidos = async () => {
        return await Pedido.findAll({
            include: [
                { model: Product },
                { model: Usuario, attributes: ["nombre", "direccion"] },
                { model: paymentMethod, attributes: ["nombre"] },
            ],
        });
    };

    const crearPedido = async (paymentMethodId, product, usuarioId) => {
        const product_data = await Promise.all(
            product.map(async (prod) => {
                const productoDB = await Product.findByPk(prod.id);
                return {
                    cantidad: prod.cantidad,
                    precio: productoDB.precio,
                    id: productoDB.id,
                };
            })
        );

        const date = new Date(Date.now());

        const precioTotal = product_data.reduce((acc, prod) => {
            return (acc += prod.cantidad * parseFloat(prod.precio));
        }, 0);

        const nuevoPedido = await Pedido.create({
            fecha: date,
            precioTotal: precioTotal,
            usuarioId: usuarioId,
            paymentMethodId: paymentMethodId,
        });

        await Promise.all(
            product_data.map(async (prod) => {
                await PedidoHasProduct.create(
                    {
                        pedidoId: nuevoPedido.id,
                        productId: prod.id,
                        cantidad: prod.cantidad,
                    },
                    { fields: ["pedidoId", "productId", "cantidad"] }
                );
            })
        );

    };

    return { traerPedidos, crearPedido }
}

module.exports = PedidosService();