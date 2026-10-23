console.log("Order Success JS Loaded");


// ==============================
// GET ORDERS
// ==============================

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];


// ==============================
// GET LATEST ORDER
// ==============================

const latestOrder =
    orders.length > 0
        ? orders[orders.length - 1]
        : null;


// ==============================
// ELEMENTS
// ==============================

const orderId =
    document.querySelector("#success-order-id");

const total =
    document.querySelector("#success-total");

const payment =
    document.querySelector("#success-payment");


// ==============================
// DISPLAY ORDER
// ==============================

if (latestOrder) {

    orderId.textContent =
        "#" + latestOrder.id;


    total.textContent =
        "₹" +
        Number(latestOrder.totalPrice || 0)
            .toLocaleString("en-IN");


    payment.textContent =
        latestOrder.paymentMethod ||
        "Cash on Delivery";

} else {

    orderId.textContent =
        "Not available";

    total.textContent =
        "₹0";

    payment.textContent =
        "Not available";

}