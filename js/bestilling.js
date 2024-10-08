"use strict";

let cart = {
    vegetarisk: { quantity: 0, price: 50, total: 0 }, // 50 kr. pr. person pr. dag
    familiefavoritter: { quantity: 0, price: 50, total: 0 },
    hurtig: { quantity: 0, price: 50, total: 0 }
};

function goToCheckout() {
    window.location.href = 'checkout.html';
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateUIFromCart();
    }
}

function updateUIFromCart() {
    for (const product in cart) {
        document.getElementById(product + "-personer").value = cart[product].quantity;
        document.getElementById(product + "-total").value = cart[product].total;
    }
    totalPrice();
}

function addToCart(product) {
    const personerInput = document.getElementById(product + '-personer');
    const retterInput = document.getElementById(product + '-retter');

    const personer = parseInt(personerInput.value, 10);
    const retter = parseInt(retterInput.value, 10);

    if (!isNaN(personer) && !isNaN(retter) && personer > 0 && retter > 0) {
        cart[product].quantity += personer;
        updateTotalPrice(product);
        saveCartToLocalStorage();
    } else {
        alert("Indtast et gyldigt antal personer og retter.");
    }
}

function updateTotalPrice(product) {
    cart[product].total = cart[product].quantity * cart[product].price;
    document.getElementById(product + "-total").value = cart[product].total;
    totalPrice();
}

function totalPrice() {
    const totalSum = Object.values(cart).reduce((sum, item) => sum + item.total, 0);
    document.getElementById("totalSum").value = totalSum;
}

function resetCart() {
    for (const product in cart) {
        cart[product].quantity = 0;
        cart[product].total = 0;
        document.getElementById(product + "-total").value = 0;
        document.getElementById(product + "-personer").value = 1;
    }
    totalPrice();
    saveCartToLocalStorage();
}

function scrollToSection() {
    const hash = window.location.hash;
    if (hash) {
        const section = document.querySelector(hash);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

window.onload = function() {
    loadCartFromLocalStorage();
    scrollToSection();
};
