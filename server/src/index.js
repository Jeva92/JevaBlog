import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import createRouter from './routes'

const app = express();

//Get variables from .env
dotenv.config();

//Cors
app.use('*', cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Router
app.use('/api', createRouter());

//Start listening
console.log('Backend listening at port: '+process.env.PORT)
app.listen(process.env.PORT);
