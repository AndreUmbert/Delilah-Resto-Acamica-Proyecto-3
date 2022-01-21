//----------------------------------------------------
//1. Express y demas librerias
//----------------------------------------------------
const express = require("express");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const db = require("./config/db");
const adminVerification = require("./controlers/adminVerification");

const {
    Pedido,
    paymentMethod,
    Product,
    PedidoHasProduct,
    Rol,
    Usuario
} = require("./models/index");
const { PedidoService } = require("./services/index");
const { response } = require("express");
const pedidoService = require("./services/pedido.service");
const APP_PORT = process.env.APP_PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

//----------------------------------------------------
//2. Instancia de express
//----------------------------------------------------

const app = express();

//----------------------------------------------------
//3.1 Middlewares Globales
//----------------------------------------------------

const rateLimitPolicy = rateLimit({
    message: "Try again later",
    max: 10,
    windowMs: 5 * 60 * 1000, //minutos * 60 * 1000
});

//----------------------------------------------------
//3.2 Middlewares Particulares para esta API
//----------------------------------------------------

//----------------------------------------------------
//3.3 Usar Librerias (que no sean express)
//----------------------------------------------------

app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());

app.use(expressJwt({
    secret: JWT_SECRET,
    algorithms: ['HS256']
}).unless({ path: ['/login'] })
);


//----------------------------------------------------
//3.4 Definir constantes
//----------------------------------------------------

//Aca podriamos crear la lista de productos, pero vamos a hacerlo posteando desde postman

//----------------------------------------------------
//4.ENDPOINTS o RUTAS
//----------------------------------------------------


//----------------------------------------------------
//USUARIOS:
//----------------------------------------------------
app.post("/login", async (req, res) => {

    const { username, contrasena } = req.body;

    const posibleUsuario = await Usuario.findOne({
        attributes: ['id', 'nombre', 'correo'],
        where: {
            username,
            contrasena
        },
        include: [{ model: Rol }],
    });

    if (posibleUsuario == null) {
        res.status(401).json({ error: "usuario o contraseña incorrecta" });
    } else {
        const token = jwt.sign({
            posibleUsuario
        }, JWT_SECRET, { expiresIn: '60m' })

        res.json({ token });
    }
});

app.post("/signup", async (req, res) => {

    try {
        const product = await db.query(
            "INSERT INTO usuario (username, nombre, correo, telefono, direccion, contrasena) values (?,?,?,?,?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [req.body.username, req.body.nombre, req.body.correo, req.body.telefono, req.body.direccion, req.body.contrasena]
            }
        );
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    }

});

//----------------------------------------------------
//PRODUCTOS:
//----------------------------------------------------

// GETS:
//Treaer todos los prodcutos
app.get("/productos", async (req, res) => {
    console.log("estoy andando");
    try {
        const product = await db.query(
            'SELECT * FROM product',
            { type: db.QueryTypes.SELECT }
        );
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    }
});

// Treaer producto por palabra
app.get("/productos/buscar/palabra/:palabraParam", async (req, res) => {
    const palabra = req.params.palabra;
    try {
        const product = await db.query(
            //NUNCA PERO NUUUNCA usar variables dentro de las consultas de SQL
            "SELECT * FROM product where nombre LIKE :palabraQuery",
            {
                type: db.QueryTypes.SELECT,
                replacements: { palabraQuery: `%${palabra}%` }
            }
        );
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    }
});

//Treaer producto por ID
app.get("/productos/buscar/:idPlato", async (req, res) => {
    const idPlato = req.params.idPlato;
    try {
        const product = await db.query(
            //NUNCA PERO NUUUNCA usar variables dentro de las consultas de SQL
            "SELECT * FROM product where id = :id",
            {
                type: db.QueryTypes.SELECT,
                replacements: { id: idPlato }
            }
        );
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    }
});

//POST:
app.post("/productos", adminVerification, async (req, res) => {
    try {
        const product = await db.query(
            "INSERT INTO product (nombre, precio) values (?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [req.body.nombre, req.body.precio]
            }
        );
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    }
});

//PUT/UPDATE:
app.put("/productos/update/:idProducto", adminVerification, async (req, res) => {
    const idProducto = req.params.idProducto;
    const updateProducto = req.body;
    const precio = req.body.precio;
    const nombre = req.body.nombre;
    console.log(precio);
    console.log(nombre);
    try {
        const product = await db.query(
            //NUNCA PERO NUUUNCA usar variables dentro de las consultas de SQL
            "UPDATE product SET nombre = :nombre, precio = :precio WHERE id = :id",
            {
                replacements: { id: idProducto, precio: precio, nombre: nombre }
            }
        );
        res.status(200).json(product);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    };
});

//DELETE:
app.delete("/productos/delete/:idPlato", adminVerification, async (req, res) => {
    const idPlato = req.params.idPlato;
    const dbPedidoHasProduct = db.models.pedidohasproduct.destroy({
        where: {
            productId: idPlato,
        }
    })
        .then(data => {
            const dbProduct = db.models.product.destroy({
                where: {
                    id: idPlato,
                }
            });
            return dbProduct;
        })
        .then(record => {
            console.log(record);
            if (record >= 1) {
                res.status(200).json({ message: "Deleted producto successfully" });
            }
            else {
                res.status(404).json({ message: "record not found" })
            }

        })
        .catch(function (error) {
            res.status(500).json(error);
        });
});

//----------------------------------------------------
//PEDIDOS:
//----------------------------------------------------

app.post("/pedidos", async (req, res) => {

    const { paymentMethodId, product, usuarioId } = req.body;
    const nuevoPedido = await pedidoService.crearPedido(paymentMethodId, product, usuarioId);

    res.json({ nuevoPedido });
});





app.get("/pedidos/dashboard", async (req, res) => {
    res.status(200);
    // if (esAdmin) {
    //traer todos los pedidos
    // } else {
    //traer todos los pedidos filtrar pedido por id de usuario y devolver los pedidos que con ese Id
    // }
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {

        res.status(401).json({ Error: "Token Invalido" });


    } else {

        const verificar = jwt.verify(token, JWT_SECRET)

        if (verificar.posibleUsuario.rol.id == 2) {
            const Pedido = await PedidoService.traerPedidos();
            res.json(Pedido);
        } else {
            const Pedido = await PedidoService.traerPedidos();
            res.json(Pedido.filter(pedidoIndividual => pedidoIndividual.dataValues.usuarioId === verificar.posibleUsuario.id));
        }

    }

});

app.put("/pedidos/update/:idPedido", adminVerification, async (req, res) => {
    const idPedido = req.params.idPedido;
    const estado = req.body.estado;
    console.log(idPedido);
    console.log(estado);
    try {
        const pedido = await db.query(
            //NUNCA PERO NUUUNCA usar variables dentro de las consultas de SQL
            "UPDATE pedido SET estado = :estado WHERE id = :id",
            {
                replacements: { id: idPedido, estado: estado }
            }
        );
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    };
    res.status(200);
});

//----------------------------------------------------
//5.LEVANTAR EL SERVIDOR
//----------------------------------------------------

app.listen(APP_PORT, () => {
    console.log(`escuchando en puerto ${APP_PORT}`);
});
