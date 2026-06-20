// Checkout JavaScript

function initializeCheckout() {
    displayCheckoutSummary();
    populateCheckoutForm();
}

function displayCheckoutSummary() {
    const summaryItems = document.getElementById('summaryItems');
    if (!summaryItems) return;
    
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <span>${item.name} x${item.quantity}</span>
            <span>₦${(item.price * item.quantity).toLocaleString()}</span>
        </div>
    `).join('');
    
    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5000;
    const tax = subtotal * 0.075;
    const total = subtotal + shipping + tax;
    
    document.getElementById('summarySubtotal').textContent = '₦' + subtotal.toLocaleString();
    document.getElementById('summaryShipping').textContent = '₦' + shipping.toLocaleString();
    document.getElementById('summaryTax').textContent = '₦' + tax.toLocaleString();
    document.getElementById('summaryTotal').textContent = '₦' + total.toLocaleString();
}

function populateCheckoutForm() {
    if (currentUser) {
        document.getElementById('fullName').value = currentUser.name || '';
        document.getElementById('email').value = currentUser.email || '';
        document.getElementById('phone').value = currentUser.phone || '';
    }
}

function placeOrder() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    if (!fullName || !email || !phone || !address || !city || !state || !paymentMethod) {
        showNotification('Please fill all required fields!', 'error');
        return;
    }
    
    const order = {
        id: 'ORD-' + Date.now(),
        receiptNumber: 'SVS-' + Date.now(),
        customerName: fullName,
        email,
        phone,
        address: `${address}, ${city}, ${state}`,
        paymentMethod,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.075,
        shipping: 5000,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 5000 + (cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.075),
        date: new Date().toLocaleString(),
        status: 'Pending'
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(order));
    cart = [];
    saveCart();
    updateCartCount();
    
    window.location.href = 'receipt.html';
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.location.pathname.includes('checkout')) {
        initializeCheckout();
    }
});
