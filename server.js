import express from 'express';
import cors from 'cors';
const app = express();

//MIDDLE WARE
app.use(cors()); //CORS

const SERVER_PORT = 3333;


app.get('/api', (req, res, next)=>{
    res.send("hello")
})

app.listen(3333, ()=>{
    console.log(`Server start with port: ${SERVER_PORT||3003}`);
})