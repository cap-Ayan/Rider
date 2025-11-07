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
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


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