require('dotenv').config();
const connectDB = require('./config/database');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // ✅ import

// ✅ Add before all routes
app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true               // allows cookies to be sent
}));

app.use(cookieParser());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});