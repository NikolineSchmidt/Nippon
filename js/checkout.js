"use strict";

// Load the cart from localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        return JSON.parse(storedCart);
    }
    return null;
}

// Display the cart data in the table
function displayCart(cart) {
    const cartTableBody = document.querySelector('#cartTable tbody');
    let totalSum = 0;

    for (const product in cart) {
        if (cart[product].quantity > 0) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.charAt(0).toUpperCase() + product.slice(1)}</td>
                <td>${cart[product].quantity}</td>
                <td>${cart[product].price} kr.</td>
                <td>${cart[product].total} kr.</td>
            `;
            cartTableBody.appendChild(row);
            totalSum += cart[product].total;
        }
    }

    // Display total sum without "kr." added here
    document.getElementById('totalSum').textContent = totalSum; // Removed "kr." here
}

// Handle placing the order
function placeOrder() {
    alert("Ordre afgivet med succes!");

    localStorage.removeItem('cart');
    window.location.href = "tak-for-din-ordre.html";
}

// Initialize the checkout page
function initCheckout() {
    const cart = loadCartFromLocalStorage();
    if (cart) {
        displayCart(cart);
    } else {
        alert("Din kurv er tom.");
    }

    document.getElementById('placeOrderButton').addEventListener('click', placeOrder);
}

window.onload = initCheckout;
