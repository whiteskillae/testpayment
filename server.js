const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Create Order API - Following v2025-01-01 Reference
app.post('/api/create-order', async (req, res) => {
    try {
        const environment = process.env.CASHFREE_ENV || 'SANDBOX';
        const url = environment === 'PRODUCTION' 
            ? 'https://api.cashfree.com/pg/orders' 
            : 'https://sandbox.cashfree.com/pg/orders';

        console.log(`Creating order in ${environment} mode...`);

        const data = {
            order_amount: 1.00,
            order_currency: 'INR',
            order_id: `order_${Date.now()}`,
            customer_details: {
                customer_id: 'devstudio_user',
                customer_phone: '9876543210',
                customer_name: 'Test User',
                customer_email: 'test@example.com'
            },
            order_meta: {
                // Cashfree PRODUCTION requires HTTPS for return_url. 
                // Using a placeholder HTTPS URL for testing on localhost.
                return_url: `https://www.cashfree.com/devstudio/return?order_id={order_id}`
            }
        };

        const response = await axios.post(url, data, {
            headers: {
                'accept': 'application/json',
                'x-api-version': '2025-01-01',
                'x-client-id': process.env.CLIENT_ID,
                'x-client-secret': process.env.CLIENT_SECRET,
                'content-type': 'application/json'
            }
        });

        console.log('--- Cashfree API Response ---');
        console.log(JSON.stringify(response.data, null, 2));
        
        // Ensure we are sending back the right field
        res.json({
            payment_session_id: response.data.payment_session_id,
            order_id: response.data.order_id,
            raw: response.data
        });
    } catch (error) {
        const errorMsg = error.response ? error.response.data : error.message;
        console.error('Cashfree Error:', errorMsg);
        res.status(500).json({ 
            error: 'Failed to create order', 
            details: errorMsg 
        });
    }
});

// Status Page
app.get('/status', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center; padding: 50px;">
            <h1>Payment Redirected</h1>
            <p>Order ID: ${req.query.order_id}</p>
            <p>Please check your dashboard for the final status.</p>
            <a href="/">Go Back</a>
        </div>
    `);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
