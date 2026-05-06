const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

// Load API Keys from .env
dotenv.config();

const app = express();

// Middleware to parse JSON bodies and serve static frontend files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Endpoint to create a Cashfree Order.
 * Called by the frontend before initiating checkout.
 */
app.post('/api/create-order', async (req, res) => {
    try {
        // 1. Setup Cashfree environment and credentials
        const isProduction = process.env.CASHFREE_ENV === 'PRODUCTION';
        const url = isProduction 
            ? 'https://api.cashfree.com/pg/orders' 
            : 'https://sandbox.cashfree.com/pg/orders';

        // 2. Prepare order data according to v2025-01-01 standards
        const orderRequest = {
            order_amount: 1.00, // Hardcoded for 1 Rupee test
            order_currency: 'AED',
            order_id: `order_${Date.now()}`,
            customer_details: {
                customer_id: 'test_user_123',
                customer_phone: '9876543210',
                customer_name: 'Test User'
            },
            order_meta: {
                // Cashfree PRODUCTION requires an HTTPS return URL
                return_url: 'https://www.cashfree.com/devstudio/return?order_id={order_id}'
            }
        };

        // 3. Make the API request to Cashfree
        const response = await axios.post(url, orderRequest, {
            headers: {
                'accept': 'application/json',
                'x-api-version': '2025-01-01',
                'x-client-id': process.env.CLIENT_ID,
                'x-client-secret': process.env.CLIENT_SECRET,
                'content-type': 'application/json'
            }
        });

        // 4. Send the session ID and order details back to the frontend
        res.json(response.data);

    } catch (error) {
        // Detailed error logging for debugging
        const errorData = error.response ? error.response.data : error.message;
        console.error('Order Creation Failed:', errorData);
        
        res.status(500).json({ 
            success: false, 
            message: 'Internal Server Error',
            details: errorData 
        });
    }
});

/**
 * Start the server
 */
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Cashfree Payment Server Ready`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`🛠️  Mode: ${process.env.CASHFREE_ENV || 'SANDBOX'}\n`);
});
