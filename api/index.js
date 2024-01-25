import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';

dotenv.config();

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('App is listening to the port 3000')
})

mongoose.connect(process.env.MONGO).then(() => {
    console.log('connected with MONGODB')
}).catch((error) => {
    console.log(error)
})

app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';

    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})