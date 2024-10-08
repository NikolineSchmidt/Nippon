"use strict";

function addToCart(product) {
    const quantity = document.getElementById(product).value;
    document.getElementById(product).value = parseInt(quantity) + 1;
    updateTotalPrice(product);
}

function removeFromCart(product) {
    const quantity = document.getElementById(product).value;
    if (quantity > 0) {
        document.getElementById(product).value = parseInt(quantity) - 1;
        updateTotalPrice(product);
    }
}

function increaseQuantity(product, amount) {
    const quantity = document.getElementById(product).value;
    document.getElementById(product).value = parseInt(quantity) + amount;
    updateTotalPrice(product);
}

function resetCart(product) {
    document.getElementById(product).value = 0;
    updateTotalPrice(product);
}

function updateTotalPrice(product) {
    const quantityElement = document.getElementById(product);
    const priceElement = document.getElementById(product + "-price");
    const totalElement = document.getElementById(product + "-total");

    if (quantityElement && priceElement && totalElement) {
        const quantity = parseInt(quantityElement.value);
        const price = 50; // 50 kr. pr. person pr. dag
        const total = quantity * price;

        totalElement.value = total;
        totalPrice('gyoza', 'japansk', 'ramen');
    }
}

function totalPrice(productA, productB, productC) {
    const totalPriceElementA = document.getElementById(productA + "-total");
    const totalPriceElementB = document.getElementById(productB + "-total");
    const totalPriceElementC = document.getElementById(productC + "-total");

    const totalPriceA = totalPriceElementA ? parseInt(totalPriceElementA.value) || 0 : 0;
    const totalPriceB = totalPriceElementB ? parseInt(totalPriceElementB.value) || 0 : 0;
    const totalPriceC = totalPriceElementC ? parseInt(totalPriceElementC.value) || 0 : 0;

    const totalSum = totalPriceA + totalPriceB + totalPriceC;

    const totalSumElement = document.getElementById("totalSum");
    if (totalSumElement) {
        totalSumElement.value = totalSum;
    }

    console.log("Updated Total Checkout Sum:", totalSum);
}
