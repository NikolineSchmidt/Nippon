"use strict";
// en let variabel, hvor prisen er 50, antal og total er begge 0, da en let variabel kan ændre sig alt efter hvor mange ting kunden vil købe.
let cart = {
    vegetarisk: { quantity: 0, price: 50, total: 0 }, 
    familiefavoritter: { quantity: 0, price: 50, total: 0 },
    hurtig: { quantity: 0, price: 50, total: 0 }
};

function goToCheckout() { //en funktion som lader en gå til checkout siden
    window.location.href = 'checkout.html';
}
// en funktion som gemmer produkterne i localStorge, JSON hjælper med at flytte dem til et andet websted, og konvertere dem til en string.
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
// en funktion som kigger i kurven, og hvis der er noget i kurven, starter if loopet
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateUIFromCart();
    }
}
//en funktion som opdatere den totale pris for, de produkter som er i kurven.
function updateUIFromCart() {
    for (const product in cart) {
        document.getElementById(product + "-personer").value = cart[product].quantity;
        document.getElementById(product + "-total").value = cart[product].total;
    }
    totalPrice();
}
// en funktion hvor man kan tilføje produkter til kurven, og hvis antal person og retter er mindre end 0 kommern en alert frem, og hvis større starter if loopet.
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
// en funktion som tillader, at nulstille sin inkøbskurv vha. et for loop
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
// gør sådan at en funktionerne loadCartFromLocalStorage & scrollToSection, først starter når siden er loadet helt ind.
window.onload = function() {
    loadCartFromLocalStorage();
    scrollToSection();
};
