"use strict";

//en funktion som loader, indholder af kurven, som den får fra localStorage vha. JSON.parse som bruges til at bytte info fra websted til websted, og gør dataen til et JS objekt.
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        return JSON.parse(storedCart);
    }
    return null;
}

// en funktion der viser indholdet af inkøbs kurven i en tabel, vha. if, altså vis produktet i kurven er større end 0, viser den antal, pris og den totale pris i kroner
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

    //det her viser bare den totale sum for de vare man vil købe
    document.getElementById('totalSum').textContent = totalSum; 
}

// en funktion som giver en alert efter man har trykket placer ordre, og derefter sender dig videre til "tak.for.din.order.html"
function placeOrder() {
    alert("Ordre afgivet med succes!");

    localStorage.removeItem('cart');
    window.location.href = "tak-for-din-ordre.html";
}

// en funktion bestående af const, if og else, den tager info fra loadCartFromLocalStorage, og giver en alert hvis kurven er tom, hvis den ikke er tom, viser den hvad man har i kurven.
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
