const pool = require("../config/db");
const bcrypt = require("bcryptjs");

//fetch all data in users
async function index(){
    const result = await pool.query(
        `SELECT * from users`,
    )

    return ({
        message : "Successfully Fetched User",
        data : result.rows
    })
}

//create user
async function create(name, email, password, role){

    //hashed password
    const hashed = await bcrypt.hash(password,10);
    const result = await pool.query(
        `INSERT INTO users(name, email, password, role)
        VALUES($1, $2, $3, $4)
        RETURNING id,name,email,role`,
        [name, email, hashed, role]
    )

    return({
        message : "Successfully Created User",
        data : result.rows[0]
    })
}

async function update(id,name, email, password, role){
    //check id exist or not
    const idExist = await pool.query(
        `SELECT * FROM users WHERE id = $1`,
        [id]
    )

    if(idExist.rows.length === 0){
        throw new Error("User not found");
    }

    //update user
    const result = await pool.query(
        `UPDATE users SET name = $1, email = $2, password = $3, role = $4 WHERE id = $5`,
        [name, email, password, role, id]
    )

    return({
        message : "Successfully Updated User",
        data : result.rows[0]
    })
}
module.exports ={
    index,
    create,
    update,
}