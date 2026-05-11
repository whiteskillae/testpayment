# Cashfree Payouts: Full Guide & Notes

This guide explains how to implement the **Cashfree Payouts** system correctly, securely, and in a production-ready manner.

---

## 1. What is Payouts?
Unlike Payment Gateway (where you *receive* money), **Payouts** is for *sending* money from your Cashfree wallet to bank accounts, UPI IDs, or wallets (Paytm/Amazon Pay).

---

## 2. Terminology You Must Know
- **Beneficiary**: The person or entity receiving the money. You must "Add" them to the system first (using bank details or UPI ID).
- **Transfer**: The actual process of moving money to a beneficiary.
- **Webhook**: An automated "ping" from Cashfree's server to your server to tell you if a transfer was Successful or Failed.
- **Idempotency**: A safety feature. If you send the same `TransferID` twice by mistake, Cashfree will ignore the second one instead of sending money twice.
- **IP Whitelisting**: For security, Cashfree only accepts API calls from specific server IP addresses you provide in the dashboard.

---

## 3. Implementation Steps (React + Node.js)

### Step 1: Add Beneficiary
Before sending money, you must register the recipient.
- **Logic**: Collect Name, Bank Account/UPI, and Email/Phone.
- **API**: `POST /payout/v1/addBeneficiary`

### Step 2: Initiate Transfer
Send the money using a unique `transferId`.
- **Logic**: Specify `amount`, `transferId`, and `beneficiaryId`.
- **API**: `POST /payout/v1/requestTransfer`

### Step 3: Handle Webhooks (Crucial)
Don't just assume a transfer is done. Wait for the webhook.
- **Logic**: Create a POST endpoint on your server (e.g., `/api/webhooks/payouts`).
- **Security**: Verify the **Signature** sent by Cashfree to ensure it's not a fake request.

---

## 4. Security Checklist
- [ ] **Server-Side Only**: Never call Payout APIs directly from React. Your `Client Secret` will be stolen.
- [ ] **Environment Variables**: Store `CLIENT_ID` and `CLIENT_SECRET` in a `.env` file.
- [ ] **IP Whitelisting**: In Production, you **MUST** whitelist your server's IP in the Cashfree Dashboard.
- [ ] **Signature Verification**: Always verify webhook signatures using your secret key.
- [ ] **Amount Validation**: Check on your server if the user actually has enough balance in *your* database before calling Cashfree.

---

## 5. Test vs. Production: Will it work?
**Short Answer**: If it works in Test, your **Logic** is correct, but the **Environment** will change.

| Feature | Test Mode | Production Mode |
| :--- | :--- | :--- |
| **Real Money** | No (Simulated) | Yes (Actual Cash) |
| **API Keys** | Test Keys | Live Keys |
| **Base URL** | `sandbox.cashfree.com` | `api.cashfree.com` |
| **IP Whitelisting** | Not required | **Required (Mandatory)** |
| **Verification** | Simple | Strict (Needs KYC/Approval) |

**Common Errors when moving to Production:**
1. **Invalid Credentials**: Forgot to swap Test Keys for Live Keys.
2. **IP Not Whitelisted**: The API returns an error because your server IP isn't allowed.
3. **Low Wallet Balance**: You forgot to add money to your Cashfree Payout wallet.
4. **Feature Not Enabled**: Some modes (like UPI) might need separate activation in Live.

---

## 6. Making it "Production Ready"
1. **Logs**: Save every Payout request and response in your own database.
2. **Error Handling**: Handle `409 Conflict` (Transfer ID already exists) and `403 Forbidden` (IP issues).
3. **Retry Logic**: If a transfer is "Pending", don't try again immediately. Use a "Status Check" API or wait for the Webhook.
4. **2FA**: Use Two-Factor Authentication if Cashfree prompts for it during sensitive API calls.

---

## 7. Policies & Logic
- **KYC**: You cannot use Production Payouts without completing your business KYC.
- **Settlement**: Payouts usually happen from your "Payout Wallet," which is different from your "Collection Wallet." You must top it up manually or via auto-transfer.
- **Transfer Limits**: Check your daily/monthly limits in the dashboard.
