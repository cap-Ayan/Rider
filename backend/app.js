const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors')

const express= require('express')

const app = express()

app.use(cors())

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.listen(process.env.PORT_NO ||3000,()=>{
    console.log("App is started")
})