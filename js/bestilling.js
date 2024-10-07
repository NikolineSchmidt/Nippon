"use strict";

// Opret et objekt til at holde styr på bestillingen
let cart = {
    gyoza: {
        quantity: 0,
        price: 10,
        total: 0
    },
    japansk: {
        quantity: 0,
        price: 12,
        total: 0
    },
    ramen: {
        quantity: 0,
        price: 15,
        total: 0
    }
   
};

// Funktion til at gemme kurven i localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Funktion til at hente kurven fra localStorage
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateUIFromCart();  // Opdaterer UI med de hentede data
    }
}

// Opdater UI fra cart (f.eks. ved sideindlæsning)
function updateUIFromCart() {
    for (const product in cart) {
        document.getElementById(product).value = cart[product].quantity;
        document.getElementById(product + "-total").value = cart[product].total;
    }
    totalPrice();
}

// Funktion til at tilføje til kurven
function addToCart(product) {
    cart[product].quantity += 1;
    updateTotalPrice(product);
    saveCartToLocalStorage();  // Gem efter ændringer
}

// Funktion til at fjerne fra kurven
function removeFromCart(product) {
    if (cart[product].quantity > 0) {
        cart[product].quantity -= 1;
        updateTotalPrice(product);
        saveCartToLocalStorage();  // Gem efter ændringer
    }
}

// Funktion til at øge kvantiteten af en bestemt vare
function increaseQuantity(product, amount) {
    cart[product].quantity += amount;
    updateTotalPrice(product);
    saveCartToLocalStorage();  // Gem efter ændringer
}

// Funktion til at nulstille kurven for et bestemt produkt
function resetCart(product) {
    cart[product].quantity = 0;
    updateTotalPrice(product);
    saveCartToLocalStorage();  // Gem efter ændringer
}

// Opdaterer totalprisen for et produkt
function updateTotalPrice(product) {
    cart[product].total = cart[product].quantity * cart[product].price;
    
    // Opdater input felter i HTML
    document.getElementById(product).value = cart[product].quantity;
    document.getElementById(product + "-total").value = cart[product].total;

    // Opdater den samlede pris for hele kurven
    totalPrice();
}

// Beregner den samlede pris for alle produkter i kurven
function totalPrice() {
    const totalSum = cart.gyoza.total + cart.japansk.total + cart.ramen.total;
    document.getElementById("totalSum").value = totalSum;
    console.log(cart); // Udskriv objektet til konsollen for at se kurvens indhold
}

// Ved sideindlæsning, prøv at hente kurven fra localStorage
window.onload = function() {
    loadCartFromLocalStorage();
};

// This code should be added to the existing script.js file
document.getElementById('checkoutButton').addEventListener('click', function() {
    // Redirect the user to checkout.html
    window.location.href = "checkout.html";
});

function addCustomQuantity(product) {
    const quantityInput = document.getElementById(product + '-quantity').value;
    const quantity = parseInt(quantityInput, 10);

    if (!isNaN(quantity) && quantity > 0) {
        cart[product].quantity += quantity;
        updateTotalPrice(product); // Update the total price for that product
        saveCartToLocalStorage();  // Save cart after changes
    } else {
        alert("Please enter a valid quantity.");
    }
}