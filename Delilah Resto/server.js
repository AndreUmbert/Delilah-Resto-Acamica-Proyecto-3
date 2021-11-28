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

const {
    Pedidos,
    FormasPago,
    Productos,
    PedidosHasProductos,
    Roles,
    Usuarios
} = require("./models/index");
const { PedidosService } = require("./services/index");
const { response } = require("express");
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
//LOGIN:
//----------------------------------------------------
app.post("/login", async (req, res) => {

    const { username, contrasena } = req.body;

    const posibleUsuario = await Usuarios.findOne({
        attributes: ['id', 'nombre', 'correo'],
        where: {
            username,
            contrasena
        },
        include: [{ model: Roles }],
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


//----------------------------------------------------
//PRODUCTOS:
//----------------------------------------------------

// GETS:
//Treaer todos los prodcutos
app.get("/productos", async (req, res) => {
    try {
        const productos = await db.query(
            'SELECT * FROM productos',
            { type: db.QueryTypes.SELECT }
        );
        res.status(200).json(productos);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    }
});

//Treaer producto por palabra
app.get("/productos/buscar/:palabraParam", async (req, res) => {
    const palabra = req.params.palabra;
    try {
        const productos = await db.query(
            //NUNCA PERO NUUUNCA usar variables dentro de las consultas de SQL
            "SELECT * FROM productos where nombre LIKE :palabraQuery",
            {
                type: db.QueryTypes.SELECT,
                replacements: { palabraQuery: `%${palabra}%` }
            }
        );
        res.status(200).json(productos);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    }
});

//Treaer producto por ID
app.get("/productos/buscar/:idPlato", async (req, res) => {
    const idPlato = req.params.idPlato;
    try {
        const productos = await db.query(
            //NUNCA PERO NUUUNCA usar variables dentro de las consultas de SQL
            "SELECT * FROM productos where id = :id",
            {
                type: db.QueryTypes.SELECT,
                replacements: { id: idPlato }
            }
        );
        res.status(200).json(productos);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    }
});

//POST:
app.post("/productos", async (req, res) => {
    try {
        const producto = await db.query(
            "INSERT INTO productos (nombre, precio) values (?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [req.body.nombre, req.body.precio]
            }
        );
        res.status(200).json(producto);
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: "Por favor reintente en unos minutos" });
    }
});

//----------------------------------------------------
//PEDIDOS:
//----------------------------------------------------

app.get("/pedidos/dashboard", async (req, res) => {
    res.status(200);

    const pedidos = await PedidosService.traerPedidos();
    res.json(pedidos);
});



//----------------------------------------------------
//5.LEVANTAR EL SERVIDOR
//----------------------------------------------------

app.listen(APP_PORT, () => {
    console.log(`escuchando en puerto ${APP_PORT}`);
});
