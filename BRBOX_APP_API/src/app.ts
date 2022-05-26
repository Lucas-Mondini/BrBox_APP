//express imports
import express from 'express';
import cors from  'cors';

//server .env import
import 'dotenv/config';

//database imports
import { AppDataSource } from './data-source';
import 'reflect-metadata'

import initialization from './services/initialization';

//router import
import mainRouter from './Routes';


const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}

//Establish database connection
AppDataSource.initialize()
.then(async ()=>{
    await initialization();
    console.log("Data source has benn initializated!")


    const app = express();

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(mainRouter);

    const PORT = process.env.PORT;

    app.listen(PORT , () => {
        console.log("server started at port: " + PORT);
    })
})
.catch((error)=>{
console.log("error during database initialization :"+error);
})