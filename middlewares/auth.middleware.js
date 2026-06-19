const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).json({
            message: "faill",
        })
    }

    try {
        //verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        //set user in request
        req.user = decoded;

        //go next()
        next();
    } catch (error) {
        res.status(401).json({
            message: error.message,
        })
    }
}

module.exports = {
    auth,
}
