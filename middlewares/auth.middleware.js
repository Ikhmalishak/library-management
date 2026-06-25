const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
    // Accept both “Bearer <token>” and plain token strings
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[0] === 'Bearer'
        ? authHeader.split(' ')[1]          // strip “Bearer ”
        : authHeader;                       // plain token

    if (!token) {
        return res.status(401).json({
            message: "Missing or invalid token",
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;   // make user info available downstream
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

module.exports = {
    auth,
}
