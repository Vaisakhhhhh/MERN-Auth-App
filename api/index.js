import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
dotenv.config();

import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js'

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB"); 
  }).catch((error) => {
    console.log(error);
  });

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

app.use((err, req, res, next ) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode,
    });
});


app.listen(3000, () => {
    console.log('Server listening on port 3000!');
});