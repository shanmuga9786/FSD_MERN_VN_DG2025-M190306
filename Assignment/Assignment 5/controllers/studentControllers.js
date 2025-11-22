const Users = require("../models/studentModel")

const getStudent = (req, res) => {
    res.send({ message: "Hi this is from GET" })
}
const createStudent = (req, res) => {
    res.send({ message: "Hi this is from post" })
}
const updateStudent = (req, res) => {
    res.send({ message: "Hi this is from put" })
}
const deleteStudent = (req, res) => {
    res.send({ message: "Hi this is from delete" })
}

const insertUser = async(req,res)=>{
    const user = await Users.create(req.body)
    res.send({user})
}

const findUsers = async(req,res)=>{
    const user = await Users.find();
    res.send({user})
}

const updateUser = async(req,res)=>{
    const id = req.params.id; // req.params.id
    let user = await Users.findByIdAndUpdate(id,req.body,{new: true}) // 
    res.send({user})
}

const deleteUser = async(req,res)=>{
    const name = req.params.name;
    let user = await Users.findOneAndDelete({name:name})
    res.send({user})
}

module.exports = {
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent,
    insertUser,
    findUsers,
    updateUser,
    deleteUser
}
