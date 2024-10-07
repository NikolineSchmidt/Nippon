"use strict";

// Load the cart from localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        return JSON.parse(storedCart);
    }
    return null;  // Return null if there's no cart
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
                <td>$${cart[product].price}</td>
                <td>$${cart[product].total}</td>
            `;
            cartTableBody.appendChild(row);
            totalSum += cart[product].total;
        }
    }

    document.getElementById('totalSum').textContent = totalSum;
}

// Handle placing the order
function placeOrder() {
    // For now, we'll just simulate an order being placed
    alert("Order placed successfully!");

    // Optionally clear the cart from localStorage
    localStorage.removeItem('cart');

    // Redirect the user to a confirmation page or home page
    window.location.href = "tak-for-din-ordre.html";  // You can create this page
}

// Initialize the checkout page
function initCheckout() {
    const cart = loadCartFromLocalStorage();
    if (cart) {
        displayCart(cart);
    } else {
        alert("Your cart is empty.");
    }

    // Set up the place order button
    document.getElementById('placeOrderButton').addEventListener('click', placeOrder);
}

// Run the init function when the page loads
window.onload = initCheckout;
