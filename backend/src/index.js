import express from 'express';
import dotenv from 'dotenv';
import { connectdb } from './lib/db.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRoutes);

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