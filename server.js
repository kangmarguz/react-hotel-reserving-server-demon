import express from 'express';
import cors from 'cors';
import campingRoute from './routes/camping.js';
const app = express();

//MIDDLE WARE
app.use(cors()); //CORS
app.use(express.json())

const SERVER_PORT = 3333;

app.use('/api', campingRoute);

app.listen(3333, () => {
    console.log(`Server start with port: ${SERVER_PORT || 3003}`);
});
