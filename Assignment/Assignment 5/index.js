const express = require('express'); 
const mongoose = require('mongoose')
const studentRoutes = require('./routes/studentRoutes');
const loginRouter = require('./routes/loginRoutes');
const app = express()


const PORT = 8000

mongoose.connect(
    "mongodb+srv://root:root@express-project.zmk69mr.mongodb.net/?appName=Express-project"
).then(()=>{
    console.log("Connected to DB")
})
.catch((err)=>{
    console.log(err)
})

app.use(express.json()) //middle ware

app.get('/', (req, res) => {
   
    res.send("Hello👋")
})

app.use(studentRoutes)

app.use('/',loginRouter);

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})