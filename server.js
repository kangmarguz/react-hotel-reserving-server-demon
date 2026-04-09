import express from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import morgan from 'morgan';
const app = express();

//MIDDLE WARE
app.use(cors()); //CORS
app.use(express.json());
app.use(morgan('dev'));

const SERVER_PORT = 3333;

const files = readdirSync('./routes').filter((f) => f.endsWith('.js'));

await Promise.all(
    files.map(async (file) => {
        const route = await import(`./routes/${file}`);
        app.use('/api', route.default);
    }),
);

app.listen(3333, () => {
    console.log(`Server start with port: ${SERVER_PORT || 3003}`);
});
