// Admin Panel JavaScript

const adminCredentials = {
    username: 'admin',
    password: 'admin123'
};

let adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';

function handleAdminLogin(e) {
    if (e) e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    if (username === adminCredentials.username && password === adminCredentials.password) {
        localStorage.setItem('adminLoggedIn', 'true');
        adminLoggedIn = true;
        window.location.href = 'admin-dashboard.html';
    } else {
        showNotification('Invalid credentials!', 'error');
    }
}

function switchAdminTab(tabName) {
    const tabs = document.querySelectorAll('.admin-tab');
    const navItems = document.querySelectorAll('.nav-item');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    navItems.forEach(item => item.classList.remove('active'));
    
    const tab = document.getElementById(tabName);
    if (tab) tab.classList.add('active');
    
    event.target.closest('.nav-item')?.classList.add('active');
}

function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }
}

function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

function showAddProductForm() {
    const form = document.getElementById('addProductForm');
    if (form) form.style.display = 'block';
}

function hideAddProductForm() {
    const form = document.getElementById('addProductForm');
    if (form) form.style.display = 'none';
}

// Update Dashboard Statistics
function updateAdminDashboard() {
    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('totalOrders').textContent = '0';
    document.getElementById('totalProducts').textContent = productsDatabase.length;
    document.getElementById('totalRevenue').textContent = '₦0';
}

// Document ready for admin pages
document.addEventListener('DOMContentLoaded', () => {
    if (document.location.pathname.includes('admin-login')) {
        const form = document.getElementById('adminLoginForm');
        if (form) form.addEventListener('submit', handleAdminLogin);
    }
    
    if (document.location.pathname.includes('admin-dashboard')) {
        if (!adminLoggedIn) {
            window.location.href = 'admin-login.html';
        }
        updateAdminDashboard();
    }
});
