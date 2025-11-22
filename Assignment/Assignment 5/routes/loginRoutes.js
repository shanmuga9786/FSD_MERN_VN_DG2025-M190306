const express = require('express'); 
const loginRouter = express.Router()
const {insertUsers, loginUser, regUser} = require("../controllers/loginControllers")
const customMiddleware = require("../middleware/customMiddleware")

loginRouter.post("/userInsertion" , insertUsers)
loginRouter.post('/login', loginUser)
loginRouter.post('/reg', regUser)

module.exports = loginRouter;
    
