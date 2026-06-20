// =====================================================
// SOMMIE VENDOR SHOP - MAIN APPLICATION JAVASCRIPT
// Your Safety is Our Priority
// =====================================================

// Global Products Database (Mock Data)
const productsDatabase = [
    { id: 1, name: 'iPhone 15 Pro', category: 'gadgets', price: 1500000, originalPrice: 1800000, image: 'https://via.placeholder.com/250x250?text=iPhone15', rating: 5, reviews: 120, description: 'Latest iPhone with advanced camera system' },
    { id: 2, name: 'Samsung Galaxy S24', category: 'gadgets', price: 1200000, originalPrice: 1500000, image: 'https://via.placeholder.com/250x250?text=Galaxy', rating: 4.5, reviews: 95, description: 'Powerful Android smartphone' },
    { id: 3, name: 'Premium T-Shirt', category: 'clothes', price: 15000, originalPrice: 20000, image: 'https://via.placeholder.com/250x250?text=TShirt', rating: 4, reviews: 45, description: 'Comfortable cotton t-shirt' },
    { id: 4, name: 'Running Shoes', category: 'footwear', price: 35000, originalPrice: 50000, image: 'https://via.placeholder.com/250x250?text=Shoes', rating: 4.5, reviews: 78, description: 'Professional running shoes' },
    { id: 5, name: 'PlayStation 5', category: 'gaming', price: 450000, originalPrice: 550000, image: 'https://via.placeholder.com/250x250?text=PS5', rating: 5, reviews: 200, description: 'Next-gen gaming console' },
    { id: 6, name: 'Premium VPN Service', category: 'digital', price: 5000, originalPrice: 8000, image: 'https://via.placeholder.com/250x250?text=VPN', rating: 4, reviews: 156, description: '1 year premium VPN access' },
];

// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentSlide = 0;
let isDarkMode = localStorage.getItem('darkMode') === 'true';
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    initializePage();
    loadDarkMode();
    updateCartCount();
    startSlideshow();
});

function initializePage() {
    const page = document.location.pathname.split('/').pop() || 'index.html';
    
    if (page === 'index.html' || page === '') {
        loadHomePage();
    } else if (page === 'products.html') {
        loadProductsPage();
    } else if (page === 'product-details.html') {
        loadProductDetailsPage();
    } else if (page === 'cart.html') {
        loadCartPage();
    }
}

// ============ HOME PAGE ============
function loadHomePage() {
    displayFlashSales();
    displayFeaturedProducts();
    displayBestSellers();
    setupNewsletter();
}

function displayFlashSales() {
    const container = document.getElementById('flashSalesProducts');
    if (!container) return;
    
    container.innerHTML = productsDatabase
        .slice(0, 4)
        .map(product => createProductCard(product))
        .join('');
}

function displayFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    container.innerHTML = productsDatabase
        .slice(0, 6)
        .map(product => createProductCard(product))
        .join('');
}

function displayBestSellers() {
    const container = document.getElementById('bestSellers');
    if (!container) return;
    
    container.innerHTML = productsDatabase
        .filter(p => p.reviews > 50)
        .map(product => createProductCard(product))
        .join('');
}

function createProductCard(product) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-body">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">⭐ ${product.rating} (${product.reviews} reviews)</div>
                <div class="product-price">
                    <span class="original-price">₦${product.originalPrice.toLocaleString()}</span>
                    <span class="discount-price">₦${product.price.toLocaleString()}</span>
                    <span class="discount-badge">${discount}% OFF</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-primary add-to-cart-btn" onclick="addToCartFromCard(${product.id})">Add to Cart</button>
                    <button class="btn wishlist-btn" onclick="addToWishlist(${product.id})">❤️</button>
                </div>
            </div>
        </div>
    `;
}

function setupNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Thank you for subscribing!', 'success');
            form.reset();
        });
    }
}

// ============ PRODUCTS PAGE ============
function loadProductsPage() {
    displayAllProducts();
}

function displayAllProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    container.innerHTML = productsDatabase
        .map(product => createProductCard(product))
        .join('');
}

function applyFilters() {
    const checkboxes = document.querySelectorAll('.filter-checkbox input:checked');
    const selectedCategories = Array.from(checkboxes).map(cb => cb.value);
    const container = document.getElementById('productsGrid');
    
    let filtered = productsDatabase;
    if (selectedCategories.length > 0) {
        filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    container.innerHTML = filtered
        .map(product => createProductCard(product))
        .join('');
}

function resetFilters() {
    document.querySelectorAll('.filter-checkbox input').forEach(cb => cb.checked = false);
    displayAllProducts();
}

function sortProducts() {
    const sortSelect = document.getElementById('sortSelect');
    const sortValue = sortSelect.value;
    let sorted = [...productsDatabase];
    
    switch(sortValue) {
        case 'newest':
            sorted = sorted.reverse();
            break;
        case 'priceLow':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'priceHigh':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
    }
    
    const container = document.getElementById('productsGrid');
    container.innerHTML = sorted
        .map(product => createProductCard(product))
        .join('');
}

function filterByCategory(category) {
    window.location.href = 'products.html';
    // Filter logic would be applied on products page
}

// ============ PRODUCT DETAILS ============
function loadProductDetailsPage() {
    const productId = getProductIdFromURL();
    const product = productsDatabase.find(p => p.id === productId);
    
    if (product) {
        displayProductDetails(product);
    }
}

function displayProductDetails(product) {
    document.getElementById('productName').textContent = product.name;
    document.getElementById('mainImage').src = product.image;
    document.getElementById('productDescription').textContent = product.description;
    document.getElementById('originalPrice').textContent = '₦' + product.originalPrice.toLocaleString();
    document.getElementById('discountPrice').textContent = '₦' + product.price.toLocaleString();
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    document.getElementById('discountBadge').textContent = discount + '% OFF';
}

function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('id')) || 1;
}

function addToCart() {
    const quantity = parseInt(document.getElementById('quantityInput').value) || 1;
    const productId = getProductIdFromURL();
    const product = productsDatabase.find(p => p.id === productId);
    
    if (product) {
        const cartItem = {
            ...product,
            quantity,
            cartId: Date.now()
        };
        cart.push(cartItem);
        saveCart();
        showNotification('Product added to cart!', 'success');
        updateCartCount();
    }
}

function addToCartFromCard(productId) {
    const product = productsDatabase.find(p => p.id === productId);
    if (product) {
        const cartItem = {
            ...product,
            quantity: 1,
            cartId: Date.now()
        };
        cart.push(cartItem);
        saveCart();
        showNotification('Product added to cart!', 'success');
        updateCartCount();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => el.textContent = totalItems);
}

// ============ CART PAGE ============
function loadCartPage() {
    displayCart();
}

function displayCart() {
    const emptyMessage = document.getElementById('emptyCartMessage');
    const cartContent = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        emptyMessage.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }
    
    emptyMessage.style.display = 'none';
    cartContent.style.display = 'grid';
    
    const tbody = document.getElementById('cartItemsBody');
    tbody.innerHTML = cart.map((item, index) => `
        <tr>
            <td>${item.name}</td>
            <td>₦${item.price.toLocaleString()}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)"></td>
            <td>₦${(item.price * item.quantity).toLocaleString()}</td>
            <td><button class="btn btn-outline" onclick="removeFromCart(${index})">Remove</button></td>
        </tr>
    `).join('');
    
    updateCartSummary();
}

function updateQuantity(index, quantity) {
    cart[index].quantity = parseInt(quantity) || 1;
    saveCart();
    displayCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartCount();
    displayCart();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.075;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = '₦' + subtotal.toLocaleString();
    document.getElementById('tax').textContent = '₦' + tax.toLocaleString();
    document.getElementById('total').textContent = '₦' + total.toLocaleString();
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}

// ============ AUTHENTICATION ============
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === 'password' ? 'text' : 'password';
}

function socialLogin(provider) {
    showNotification(`${provider} login coming soon!`, 'info');
}

// ============ DARK MODE ============
function loadDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    localStorage.setItem('darkMode', isDarkMode);
    document.body.classList.toggle('dark-mode');
}

// ============ NOTIFICATIONS ============
function showNotification(message, type = 'info') {
    const container = document.getElementById('notificationContainer');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    
    notification.innerHTML = `
        <strong>${icons[type]}</strong>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============ SLIDER ============
function startSlideshow() {
    setInterval(() => {
        nextSlide();
    }, 5000);
}

function nextSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
    updateDots();
}

function previousSlide() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    updateDots();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    slides[currentSlide].classList.remove('active');
    currentSlide = index;
    slides[currentSlide].classList.add('active');
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// ============ QUANTITY CONTROLS ============
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    const value = parseInt(input.value);
    if (value > 1) {
        input.value = value - 1;
    }
}

// ============ WISHLIST ============
function addToWishlist(productId) {
    showNotification('Added to wishlist!', 'success');
}

// ============ LOGOUT ============
function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    window.location.href = 'index.html';
}

// ============ PRINT RECEIPT ============
function printReceipt() {
    window.print();
}

function downloadReceiptPDF() {
    const element = document.getElementById('receiptCard');
    const opt = {
        margin: 10,
        filename: 'receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    html2pdf().set(opt).from(element).save();
}

// ============ SHARE PRODUCT ============
function shareProduct(platform) {
    const url = window.location.href;
    const title = document.getElementById('productName')?.textContent || 'Check this product!';
    
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
    };
    
    if (platform === 'copy') {
        navigator.clipboard.writeText(url);
        showNotification('Link copied!', 'success');
    } else if (shareUrls[platform]) {
        window.open(shareUrls[platform], '_blank');
    }
}

function copyProductLink() {
    navigator.clipboard.writeText(window.location.href);
    showNotification('Product link copied!', 'success');
}

// ============ DASHBOARD ============
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const menuItems = document.querySelectorAll('.menu-item');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    menuItems.forEach(item => item.classList.remove('active'));
    
    const tab = document.getElementById(tabName);
    if (tab) {
        tab.classList.add('active');
    }
    
    event.target.closest('.menu-item')?.classList.add('active');
}

function addToWishlist() {
    showNotification('Added to wishlist!', 'success');
}

function buyNow() {
    addToCart();
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}