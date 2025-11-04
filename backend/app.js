const dotenv = require('dotenv');
const connectDB = require('./config/dbConnect.js');
const userRouter = require('./routes/userRouter.js');
const cookieParser = require('cookie-parser');

dotenv.config()
const cors = require('cors')

const express= require('express')

connectDB();

const app = express()

app.use(cors())
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/users',userRouter)

app.listen(process.env.PORT_NO ||3000,()=>{
    console.log("App is started")
})