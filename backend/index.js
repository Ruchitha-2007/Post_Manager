import express from 'express';
const app= express();
import 'dotenv/config';
import connectDB from './db/db.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'; // Added cors import
import postRoutes from './routes/postRoutes.js';
import { verifyJWT } from './verifyJWT.js';
import cookieParser from 'cookie-parser'

app.use(cors({
  origin: 'https://post-manager-ul6g.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('/*', cors()); // ✅ REQUIRED
app.use(express.json());
app.use(cookieParser()); // Added cookie-parser middleware

connectDB();

app.use('/auth', userRoutes); 

app.get('/',async(req,res)=>{
    res.status(200).send({message:'Let us get started'});
})

app.use('/posts',verifyJWT,postRoutes);

app.use(/.*/,verifyJWT,(req,res)=>{
    return res.status(404).send({message:'API endpoint not found'});
});
const PORT =  Number(process.env.PORT)||5000; // Added default port if process.env.PORT is undefined

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
