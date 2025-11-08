const dotenv = require('dotenv');
const connectDB = require('./config/dbConnect.js');
const userRouter = require('./routes/userRouter.js');
const captainRouter = require('./routes/captainRouter.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config()

const express= require('express')

connectDB();

const app = express()
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api/users',userRouter)
app.use('/api/captain',captainRouter)

app.listen(process.env.PORT_NO ||3000,()=>{
    console.log("App is started")
})