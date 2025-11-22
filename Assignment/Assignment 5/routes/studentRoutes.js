const express = require('express'); 
const studentRouter = express.Router()
const {getStudent, createStudent, updateStudent, deleteStudent, insertUser, findUsers, updateUser, deleteUser} = require('../controllers/studentControllers')
const customMiddleware = require("../middleware/customMiddleware")

studentRouter.get("/getStudent",customMiddleware,getStudent)
studentRouter.post("/createStudent",customMiddleware,createStudent)
studentRouter.get("/updateStudent",customMiddleware,updateStudent)
studentRouter.get("/deleteStudent",customMiddleware,deleteStudent)

studentRouter.post("/userDetails" , insertUser)
studentRouter.get("/findUsers" ,findUsers)
studentRouter.put("/updateUsers/:id" ,updateUser)
studentRouter.put("/deleteUsers/:id" ,deleteUser)

module.exports = studentRouter;