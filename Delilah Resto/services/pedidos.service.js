//haciendolo con notacion modular con funciones
const { Pedidos, Productos, Usuarios, FormasPago } = require('./../models');

//Esto es un closure (es una funcion que retorna un objeto de funciones)
const PedidosService = () => {
    //las cargo desde el index porque es un patron decorador
    //si traigo pedidos desde pedidos, no traigo sus relaciones
    const traerPedidos = async () => await Pedidos.findAll({
        include: [
            { model: Productos },
            { model: Usuarios, attributes: ["nombre", "direccion"] },
            { model: FormasPago, attributes: ["nombre"] },
        ],

    });

    return { traerPedidos }
}

module.exports = PedidosService();