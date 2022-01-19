const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const adminVerification = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) {

        res.status(401).json({ Error: "Token Invalido" });


    } else {

        const verificar = jwt.verify(token, JWT_SECRET)

        if (verificar.posibleUsuario.rol.id == 2) { next(); }
        else { res.status(401).json({ Error: "No es admin" }); }

    }

}

module.exports = adminVerification;
