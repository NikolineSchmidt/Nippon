"use strict";

// Opret et objekt til at holde styr på bestillingen
let cart = {
    vegetarisk: {
        quantity: 0,
        price: 10,
        total: 0
    },
    familiefavoritter: {
        quantity: 0,
        price: 12,
        total: 0
    },
    hurtig: {
        quantity: 0,
        price: 15,
        total: 0
    }
};

// Funktion til at beregne prisen baseret på antal personer og retter
function calculatePrice(product) {
    const personer = document.getElementById(`${product}-personer`).value;
    const retter = document.getElementById(`${product}-retter`).value;

    const pricePerUnit = cart[product].price; // Fastsæt prisen pr. enhed
    const totalPrice = pricePerUnit * personer * retter; // Beregn total pris

    document.getElementById(`${product}-total`).value = totalPrice; // Opdater totalpris feltet
}

// Funktion til at tilføje til kurven
function addToCart(product) {
    const total = parseFloat(document.getElementById(`${product}-total`).value);
    cart[product].total += total; // Tilføj totalen til kurven
    cart[product].quantity += 1; // Øg kvantiteten
    updateTotalPrice(product); // Opdater totalprisen
    saveCartToLocalStorage(); // Gem i local storage
}

// Funktion til at nulstille kurven
function resetCart() {
    for (const product in cart) {
        cart[product].quantity = 0;
        cart[product].total = 0;
        document.getElementById(`${product}-total`).value = 0; // Nulstil totalpris feltet
        document.getElementById(`${product}-personer`).value = 1; // Nulstil antal personer
        document.getElementById(`${product}-retter`).value = 1; // Nulstil antal retter
    }
    totalPrice(); // Opdater den samlede pris
    saveCartToLocalStorage(); // Gem i local storage
}

// Opdaterer totalprisen for hele kurven
function updateTotalPrice(product) {
    const totalSum = cart.vegetarisk.total + cart.familiefavoritter.total + cart.hurtig.total;
    document.getElementById("totalSum").value = totalSum; // Opdater total sum
}

// Beregner den samlede pris for alle produkter i kurven
function totalPrice() {
    const totalSum = cart.vegetarisk.total + cart.familiefavoritter.total + cart.hurtig.total;
    document.getElementById("totalSum").value = totalSum; // Opdater total sum
}

// Ved sideindlæsning, prøv at hente kurven fra localStorage
window.onload = function() {
    loadCartFromLocalStorage();
};

// Resten af din eksisterende JS kode...
