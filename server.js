import express from 'express';
import Connection from './flipkart_clone/server/database/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import DefaultData from './flipkart_clone/server/default.js';
import Router from './flipkart_clone/server/routes/route.js';

const app= express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));  
app.use('/', Router);

const PORT= process.env.PORT || 8000;

const USERNAME=process.env.DB_USERNAME;
const PASSWORD=encodeURIComponent( process.env.DB_PASSWORD);

const URL=process.env.MONGODB_URI || `mongodb://${USERNAME}:${PASSWORD}@ac-meqna97-shard-00-00.mum8tgk.mongodb.net:27017,ac-meqna97-shard-00-01.mum8tgk.mongodb.net:27017,ac-meqna97-shard-00-02.mum8tgk.mongodb.net:27017/?ssl=true&replicaSet=atlas-8iihv5-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
}

app.listen(PORT, ()=>console.log(`server is running successfully on PORT ${PORT}`));

DefaultData();