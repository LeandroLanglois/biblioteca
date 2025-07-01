import express from 'express';
import routes from './routes.js';
import env from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();


app.use(cors()); // Permite requisições de outros domínios
app.use(express.json());
app.use(routes);

env.config();

app.use(express.json()); // Converte em JSON

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();


app.listen(3000, () => {
  console.log('Server is running on port 3000');
  console.log('Visit http://localhost:3000 to see the server in action');
});

