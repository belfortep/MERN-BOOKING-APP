import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';
import hotelRoute from './routes/hotels.js';
import roomRoute from './routes/rooms.js';
import cookieParser from 'cookie-parser';

dotenv.config()
const app = express();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
        throw err
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('DB DISCONNECTED');
})
mongoose.connection.on('connected', () => {
    console.log('DB CONNECTED')
})

//middlewares
app.use(express.json());

app.use(cookieParser());

//routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/rooms', roomRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something wrong..."
    return res.status(errorStatus).json({ message: errorMessage, success: false, status: errorStatus, stack: err.stack })
})

app.listen(4000, () => {
    connect();
    console.log('Server on port 4000');
})

