// Shopping Cart JavaScript

function updateCartDisplay() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => el.textContent = cartCount);
}

function addProductToCart(productId, quantity = 1) {
    const product = productsDatabase.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity, cartId: Date.now() });
    }
    
    saveCart();
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
}

function removeProductFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    saveCart();
    updateCartDisplay();
    displayCart();
}

function updateProductQuantity(cartId, quantity) {
    const item = cart.find(item => item.cartId === cartId);
    if (item) {
        item.quantity = Math.max(1, parseInt(quantity));
        saveCart();
        updateCartDisplay();
        displayCart();
    }
}

function clearCart() {
    if (confirm('Clear entire cart?')) {
        cart = [];
        saveCart();
        updateCartDisplay();
        displayCart();
        showNotification('Cart cleared', 'info');
    }
}