import express from 'express';
import cors from  'cors';
import 'dotenv/config';

const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}

const app = express();

app.use(cors(corsOptions));
app.use(express.json());


app.listen(8080 , () => {
    console.log("server started");
})