import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import morgan from 'morgan';
import handleError from './middlewares/error.js';
const app = express();

//MIDDLE WARE
app.use(cors()); //CORS
app.use(express.json());
app.use(morgan('dev'));

const SERVER_PORT = 3333;

const files = readdirSync('./routes').filter((f) => f.endsWith('.js'));

for (const result of files) {
    const route = await import(`./routes/${result}`);
    app.use('/api', route.default);
}

app.use(handleError);

app.listen(3333, () => {
    console.log(`Server start with port: ${SERVER_PORT || 3003}`);
});
