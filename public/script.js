// Initialize Cashfree SDK
// Note: We use 'sandbox' mode for testing. Switch to 'production' for live.
const cashfree = Cashfree({
    mode: "sandbox" 
});

/**
 * Triggered when a user clicks "Pay Now"
 */
async function payNow(amount, productId) {
    try {
        // Show loading state/modal
        document.getElementById('payment-overlay').classList.remove('hidden');
        const paymentElementContainer = document.getElementById('payment-element');
        paymentElementContainer.innerHTML = '<div class="loader">Creating session...</div>';

        // 1. Create order on the backend to get payment_session_id
        const response = await fetch('/api/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount, productId })
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error + (data.details ? ': ' + data.details : ''));
        }

        const paymentSessionId = data.payment_session_id;

        // 2. Initialize Cashfree Elements
        const elements = cashfree.elements({
            paymentSessionId: paymentSessionId
        });

        // 3. Create and mount the Payment Element
        const paymentElement = elements.create("payment-element");
        paymentElementContainer.innerHTML = ''; // Clear loader
        paymentElement.mount("#payment-element");

        // 4. Handle "Confirm Payment" button click
        const payBtn = document.getElementById("pay-btn");
        payBtn.onclick = async () => {
            payBtn.innerText = "Processing...";
            payBtn.disabled = true;

            try {
                const result = await cashfree.pay({
                    elements: elements,
                    redirectTarget: "_self" // Or "_modal" if supported for pay
                });

                if (result.error) {
                    showStatus("Payment Failed: " + result.error.message);
                } else if (result.redirect) {
                    console.log("Redirecting for 3DS...");
                }
            } catch (err) {
                console.error("Pay error:", err);
                showStatus("Error during payment");
            } finally {
                payBtn.innerText = "Confirm Payment";
                payBtn.disabled = false;
            }
        };

    } catch (error) {
        console.error('Payment Error:', error);
        showStatus('Error: ' + error.message);
        closeModal();
    }
}

/**
 * Handles the result of the payment after user interacts with Cashfree UI
 */
function handlePaymentResult(paymentDetails) {
    const status = paymentDetails.paymentMessage; // e.g., "Transaction Successful"
    showStatus(status);
}

/**
 * Shows a status message to the user
 */
function showStatus(message) {
    const statusContainer = document.getElementById('status-container');
    const statusMessage = document.getElementById('status-message');
    
    statusMessage.innerText = message;
    statusContainer.classList.remove('hidden');
    document.getElementById('payment-overlay').classList.add('hidden');
}

/**
 * Closes the payment modal
 */
function closeModal() {
    document.getElementById('payment-overlay').classList.add('hidden');
}
