const express = require("express");
const { Pedidos } = require("./models/index");
const { PedidosService } = require('./services');
const app = express();

const APP_PORT = process.env.APP_PORT || 3000;

app.use(express.json());

app.get("/pedidos/dashboard", async (req, res) => {

    res.status(200);
    res.json(PedidosService.traerPedidos());
});


app.listen(APP_PORT, () => {
    console.log(`escuchando en puerto ${APP_PORT}`);
});