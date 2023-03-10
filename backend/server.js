const express = require('express');
const dotenv = require('dotenv').config();

const { connectDB } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT;

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/goals', require('./routes/goalsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
