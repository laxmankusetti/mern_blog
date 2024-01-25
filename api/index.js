import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected with MONGODB')
}).catch((error) => {
    console.log(error)
})

const app = express();

app.listen(3000, () => {
    console.log('App is listening to the port 3000')
})