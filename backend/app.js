import  express  from "express";
import dotenv from "dotenv";
import './db/conn.js';
import authroute from './routes/auth.js';
import userroute from './routes/user.js';
dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/auth',authroute);
app.use('/user',userroute);

app.get('/',(req,res)=>{
    res.send(`Server running`);
})

app.listen(port,()=>{
    console.log(`server running at ${port}`)
})


