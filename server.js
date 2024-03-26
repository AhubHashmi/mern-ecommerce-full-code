import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import categoryRoute from './routes/categoryRoute.js';
import productRoute from './routes/productRoute.js';
import path from 'path';

dotenv.config();

//db config
connectDB();

//rest obj
const app = express();

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoute);
app.use('/api/v1/product', productRoute);

//rest api
// app.use('*', function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app</h1>");
});

const port = process.env.PORT || 8000;

//run listen
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

