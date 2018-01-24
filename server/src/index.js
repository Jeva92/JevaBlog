import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import createRouter from './routes'

dotenv.config();
const app = express();
app.use('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', createRouter());
console.log('Backend listening at port: '+process.env.PORT)
app.listen(process.env.PORT);
