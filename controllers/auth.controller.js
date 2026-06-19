const registerAuth = require('../services/auth.service');

async function register(req, res) {
    console.log(req.headers['content-type']);
    console.log(req.body);
    try {
        const { name, email, password, role } = req.body;

        // Call register function from auth service
        const result = await registerAuth.register(
            name,
            email,
            password,
            role
        );

        console.log(result);

        res.status(201).json(result);

    } catch (error) {
        console.log("Register error:", error);

        res.status(500).json({
            message: error.message
        });
    }
}

async function login(req, res) {
    try {
        //destructure req.body
        const { email, password } = req.body;

        //call function login from auth service
        const result = await registerAuth.login(email, password);

        res.status(201).json({
            message : result.message,
            token : result.token,
            data: result.data
        });

    } catch (error) {
        console.log("Login:", error);
        res.status(401).json({
            message: error.message
        });
    }
}

module.exports = {
    register,
    login,
}