const mongoose = require("mongoose")
const Login = require("../models/loginModals")
const bcrypt = require('bcrypt')

//User insertion
const insertUsers = async (req, res) => {
    const user = await Login.create(req.body)
    res.send({ user })
}

//Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Login.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: '404 User not found' })
        }

        const verify = await bcrypt.compare(password == user.password)
        if (verify) {
            return res.status(404).send({ message: "Invalid Credentials" })
        }

        res.status(200).send({ message: 'Login Sucessfully' })
    }
    catch (error) {
        console.error("Login Error: ", error);
        res.send({ message: "Internal Server Error" })
    }
}

//Register
const regUser = async (req, res) => {
    try {
        const { name, age, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Login.findOne({ email: email })
        if (user) {
            return res.status(200).json({ message: "User found", user })
        }
        const details = await Login.create({
            name,
            age,
            email,
            password: hashedPassword
        });

        res.status(200).json(details)
    }
    catch (err) {
        console.error("Login Error: ", error);
        res.send({ message: "Internal Server Error" })
    }
}
module.exports = {insertUsers, loginUser , regUser}