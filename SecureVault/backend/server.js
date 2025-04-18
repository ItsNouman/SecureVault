import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import transporter from './config/nodemailer.js';
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// const allowedOrigins=['http://localhost:3001']

connectDB();


app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());


app.get('/', (req, res) => {
  res.send("API is working");
});

app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port http://localhost:${PORT}`);
});
