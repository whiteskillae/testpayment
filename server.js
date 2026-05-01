const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const orderRoutes = require('./routes/orderRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', orderRoutes);

// Fallback: Serve frontend for any unknown routes
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Cashfree Environment: ${process.env.CASHFREE_ENV || 'SANDBOX'}`);
});
