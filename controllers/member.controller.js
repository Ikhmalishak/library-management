const memberService = require('../services/member.service');

async function index(req,res) {
    //call index method

    console.log(req.user);
    try {
        const result = await memberService.index();

        res.status(200).json({
            message : result.message,
            data : result.data
        })
    } catch (error) {
        res.status(400).json({
            message : "Error fetching user", 
            error : error.message,
        })
    }
}

async function create(req,res){
    try {
        //destructure req.body
        const { name, email, password, role } = req.body;

        //call function create from member service
        const result = await memberService.create(name, email, password, role);

        res.status(201).json({
            message : result.message,
            data : result.data
        })
    } catch (error) {
        res.status(400).json({
            message : "Error creating user", 
            error : error.message,
        })
    }
}

async function update(req,res){
    const {id,name,email,password,role} = req.body;
    try {
        const result = await memberService.update(id,name,email,password,role)

        res.status(200).json({
            message : result.message,
            data : result.data
        })
    } catch (error) {
        res.status(400).json({
            message : "Error updating user", 
            error : error.message,
        })
    }
}

module.exports = {
    index,
    create,
    update
}