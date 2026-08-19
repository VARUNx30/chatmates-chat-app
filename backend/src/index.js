import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import cookieParser from 'cookie-parser'
import messageRoutes from './routes/message.route.js'
import cors from 'cors'

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const startServer = async () => {
    try {
        await connectdb();

        app.listen(PORT, () => {
            console.log("Server is running on PORT: " + PORT);
        });
    } catch (error) {
        console.error("Server failed to start:", error.message);
    }
};

startServer();