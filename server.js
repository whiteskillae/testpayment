const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');

// Load API Keys from .env
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory wallet for demonstration (Resets on server restart)
let userWallet = 0.00;

/**
 * Endpoint to get current wallet balance
 */
app.get('/api/wallet-balance', (req, res) => {
    res.json({ balance: userWallet });
});

/**
 * Endpoint to simulate successful payment and add to wallet
 */
app.post('/api/test/confirm-payment', (req, res) => {
    const { amount } = req.body;
    if (amount && !isNaN(amount)) {
        userWallet += parseFloat(amount);
        console.log(`Wallet updated: +${amount}. New balance: ${userWallet}`);
        return res.json({ success: true, balance: userWallet });
    }
    res.status(400).json({ success: false, message: 'Invalid amount' });
});

/**
 * Endpoint to create a Cashfree Order.
 */
app.post('/api/create-order', async (req, res) => {
    try {
        const { amount } = req.body;
        const isProduction = process.env.CASHFREE_ENV === 'PRODUCTION';
        const url = isProduction 
            ? 'https://api.cashfree.com/pg/orders' 
            : 'https://sandbox.cashfree.com/pg/orders';

        const orderRequest = {
            order_amount: amount || 1.00,
            order_currency: 'INR',
            order_id: `order_${Date.now()}`,
            customer_details: {
                customer_id: 'user_123',
                customer_phone: '9999999999',
                customer_name: 'Test User'
            },
            order_meta: {
                return_url: 'https://www.cashfree.com/devstudio/return?order_id={order_id}'
            }
        };

        const response = await axios.post(url, orderRequest, {
            headers: {
                'accept': 'application/json',
                'x-api-version': '2023-08-01', // Standard stable version
                'x-client-id': process.env.CLIENT_ID,
                'x-client-secret': process.env.CLIENT_SECRET,
                'content-type': 'application/json'
            }
        });

        res.json(response.data);

    } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error('Order Creation Failed:', errorData);
        res.status(500).json({ success: false, details: errorData });
    }
});

/**
 * WITHDRAWAL SYSTEM (CASHFREE PAYOUTS)
 */

// Helper to get Payout Token
const getPayoutToken = async () => {
    const isProduction = process.env.CASHFREE_ENV === 'PRODUCTION';
    const url = isProduction 
        ? 'https://payout-api.cashfree.com/payout/v1/authorize'
        : 'https://payout-gamma.cashfree.com/payout/v1/authorize';

    const response = await axios.post(url, {}, {
        headers: {
            'X-Client-Id': process.env.CLIENT_ID,
            'X-Client-Secret': process.env.CLIENT_SECRET
        }
    });

    if (response.data.status === 'SUCCESS') {
        return response.data.data.token;
    }
    throw new Error('Payout Authorization Failed');
};

/**
 * Endpoint to initiate withdrawal
 */
app.post('/api/payout/withdraw', async (req, res) => {
    const { amount, beneficiaryId, vpa, bankAccount, ifsc, name, phone } = req.body;

    // 1. Logic Check: Does user have enough balance?
    if (userWallet < amount) {
        return res.status(400).json({ success: false, message: 'Insufficient wallet balance' });
    }

    try {
        const token = await getPayoutToken();
        const isProduction = process.env.CASHFREE_ENV === 'PRODUCTION';
        const baseUrl = isProduction ? 'https://payout-api.cashfree.com' : 'https://payout-gamma.cashfree.com';

        // 2. Add Beneficiary (Standard step before transfer)
        try {
            const beneData = {
                beneId: beneficiaryId || `bene_${Date.now()}`,
                name: name || 'Test User',
                email: 'test@example.com',
                phone: phone || '9999999999'
            };

            if (vpa) {
                beneData.vpa = vpa;
            } else if (bankAccount && ifsc) {
                beneData.bankAccount = bankAccount;
                beneData.ifsc = ifsc;
            }

            await axios.post(`${baseUrl}/payout/v1/addBeneficiary`, beneData, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('Beneficiary added/verified');
        } catch (beneErr) {
            console.log('Beneficiary check:', beneErr.response ? beneErr.response.data.message : beneErr.message);
        }

        // 3. Request Transfer
        const transferResponse = await axios.post(`${baseUrl}/payout/v1/requestTransfer`, {
            beneId: beneficiaryId || `bene_${Date.now()}`,
            amount: amount,
            transferId: `trans_${Date.now()}`
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (transferResponse.data.status === 'SUCCESS') {
            userWallet -= parseFloat(amount); // Deduct from wallet
            res.json({ success: true, message: 'Withdrawal initiated', data: transferResponse.data });
        } else {
            res.status(400).json({ success: false, message: 'Transfer failed', data: transferResponse.data });
        }

    } catch (error) {
        const errorData = error.response ? error.response.data : error.message;
        console.error('Withdrawal Failed:', errorData);
        res.status(500).json({ success: false, message: 'Withdrawal Failed', details: errorData });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Payment & Withdrawal Server Ready`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log(`🛠️  Mode: ${process.env.CASHFREE_ENV || 'SANDBOX'}\n`);
});
