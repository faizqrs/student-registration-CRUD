import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import studentRoutes from './routes/studentRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.use('/api', studentRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/studentdb')
.then(()=>{
    console.log("MongoDB Connected")
})
.catch(err=>{console.log("error while connecting to monggo");
})
export default app;
