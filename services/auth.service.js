const pool = require("../config/db");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

async function register(name, email, password, role) {
    //hashed the password
    const hashed = await bcrypt.hash(password, 10);

    const result = await pool.query(
        `INSERT INTO users (name,email,password, role)
        VALUES($1, $2, $3, $4)
        RETURNING id,name,email, role`,
        [name, email, hashed, role]
    )
    return result.rows[0]
}

async function login(email, password) {

    //find the email inside database
    const emailExist = await pool.query(
        `SELECT name,email,password,role
        FROM users 
        WHERE email = $1`,
        [email]
    )

    if (emailExist.rows.length === 0) {
        throw new Error('User does not exist');
    }

    const user = emailExist.rows[0];
    console.log(user);

    const isMatch = bcrypt.compare(user.password, password);

    if (!isMatch) {
        throw new Error("Wrong Password");
    }

    const payload = {
        name: user.name,
        email: user.email,
        role: user.role,
    }

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(payload, secretKey,
        {
            expiresIn: '1h',
        }
    )

    return ({
        message: "Successfully Login",
        token: token,
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    });

}
module.exports = {
    register,
    login
};