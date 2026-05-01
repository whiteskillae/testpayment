const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * POST /api/create-order
 * Creates a new order on Cashfree and returns the payment_session_id
 */
router.post('/create-order', async (req, res) => {
    try {
        const { amount, productId } = req.body;

        // Basic validation
        if (!amount || isNaN(amount)) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Cashfree Credentials from .env
        const clientId = process.env.CLIENT_ID;
        const clientSecret = process.env.CLIENT_SECRET;
        const environment = process.env.CASHFREE_ENV || 'SANDBOX';

        // Cashfree API URL based on environment
        const baseUrl = environment === 'PRODUCTION' 
            ? 'https://api.cashfree.com/pg/orders' 
            : 'https://sandbox.cashfree.com/pg/orders';

        // Order data
        const orderData = {
            order_id: `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            order_amount: parseFloat(amount).toFixed(2),
            order_currency: 'INR',
            customer_details: {
                customer_id: 'cust_12345',
                customer_name: 'John Doe',
                customer_email: 'john.doe@example.com',
                customer_phone: '9999999999'
            },
            order_meta: {
                return_url: `${environment === 'PRODUCTION' ? 'https' : req.protocol}://${req.get('host')}/payment-status?order_id={order_id}`,
                notify_url: 'https://your-webhook-url.com/callback' // Optional: for webhooks
            },
            order_note: `Payment for ${productId}`
        };

        // Create order on Cashfree
        const response = await axios.post(baseUrl, orderData, {
            headers: {
                'x-client-id': clientId,
                'x-client-secret': clientSecret,
                'x-api-version': '2023-08-01', // Latest API version
                'Content-Type': 'application/json'
            }
        });

        // Return payment_session_id to frontend
        res.json({
            payment_session_id: response.data.payment_session_id,
            order_id: response.data.order_id
        });

    } catch (error) {
        console.error('Cashfree Order Creation Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: 'Failed to create order', 
            details: error.response ? error.response.data.message : error.message 
        });
    }
});

module.exports = router;
