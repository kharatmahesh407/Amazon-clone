console.log("Orders JS Loaded");


// ==============================
// GET ORDERS
// ==============================

const orders =
    JSON.parse(localStorage.getItem("orders")) || [];


// ==============================
// CONTAINER
// ==============================

const ordersContainer =
    document.querySelector("#orders-container");


// ==============================
// NO ORDERS
// ==============================

if (orders.length === 0) {

    ordersContainer.innerHTML = `

        <div class="no-orders">

            <h2>
                You haven't placed any orders yet.
            </h2>

            <p>
                Start shopping and your orders
                will appear here.
            </p>

            <a href="index.html">
                Start Shopping
            </a>

        </div>

    `;

} else {


    // ==============================
    // DISPLAY ORDERS
    // ==============================

    orders
        .slice()
        .reverse()
        .forEach(function (order) {

            let orderItems = "";

            let calculatedTotal = 0;

            let calculatedItems = 0;


            // ==============================
            // ORDER ITEMS
            // ==============================

            order.items.forEach(function (cartItem) {

                const selectedProduct =
                    product.find(
                        item => item.id === cartItem.id
                    );


                if (!selectedProduct) return;


                const quantity =
                    Number(cartItem.quantity) || 1;


                const itemTotal =
                    selectedProduct.price * quantity;


                calculatedTotal += itemTotal;

                calculatedItems += quantity;


                // ==============================
                // DELIVERY DATE
                // ==============================

                const deliveryDate =
                    cartItem.deliveryDate ||
                    "Delivery date not available";


                // ==============================
                // PRODUCT HTML
                // ==============================

                orderItems += `

                    <div class="order-product">

                        <img
                            src="${selectedProduct.image}"
                            alt="${selectedProduct.name}"
                        >


                        <div class="order-product-info">

                            <h3>
                                ${selectedProduct.name}
                            </h3>


                            <p>
                                ₹${selectedProduct.price.toLocaleString("en-IN")}
                            </p>


                            <p>
                                Quantity:
                                ${quantity}
                            </p>


                            <p>
                                Item Total:
                                ₹${itemTotal.toLocaleString("en-IN")}
                            </p>


                            <div class="delivery-status">

                                <strong>
                                    Delivery:
                                </strong>

                                <span>
                                    ${deliveryDate}
                                </span>

                            </div>


                            ${
                                cartItem.cancelled
                                ?

                                `
                                <p class="cancelled-text">
                                    Order Cancelled
                                </p>
                                `

                                :

                                `
                                <button
                                    class="product-buy-again"
                                    data-product-id="${selectedProduct.id}"
                                >
                                    Buy Again
                                </button>


                                <button
                                    class="product-cancel-btn"
                                    data-order-id="${order.id}"
                                    data-product-id="${selectedProduct.id}"
                                >
                                    Cancel Order
                                </button>
                                `
                            }

                        </div>

                    </div>

                `;

            });


            // ==============================
            // TOTAL
            // ==============================

            const totalPrice =
                Number(order.totalPrice) ||
                calculatedTotal;


            const totalItems =
                Number(order.totalItems) ||
                calculatedItems;


            // ==============================
            // ORDER DATA
            // ==============================

            const paymentMethod =
                order.paymentMethod ||
                "Cash on Delivery";


            const orderDate =
                order.date ||
                "Date not available";


            const orderId =
                order.id ||
                "N/A";


            const orderStatus =
                order.status ||
                "Order Confirmed";


            // ==============================
            // ORDER CARD
            // ==============================

            ordersContainer.innerHTML += `

                <div class="order-card">

                    <div class="order-header">

                        <div>

                            <strong>
                                Order Placed
                            </strong>

                            <p>
                                ${orderDate}
                            </p>

                        </div>


                        <div>

                            <strong>
                                Order ID
                            </strong>

                            <p>
                                #${orderId}
                            </p>

                        </div>

                    </div>


                    <div class="order-body">

                        <div class="order-status">

                            <strong>
                                Order Status:
                            </strong>

                            <span>
                                ${orderStatus}
                            </span>

                        </div>


                        <h2>
                            Order Details
                        </h2>


                        ${orderItems}


                        <div class="order-total">

                            <strong>
                                ${totalItems} Items
                            </strong>


                            <strong>
                                Total:
                                ₹${totalPrice.toLocaleString("en-IN")}
                            </strong>

                        </div>


                        <p class="payment-method">

                            Payment:
                            ${paymentMethod}

                        </p>

                    </div>

                </div>

            `;

        });

}


// ==============================
// PRODUCT BUY AGAIN
// ==============================

document.addEventListener("click", function (e) {


    // ==============================
    // BUY AGAIN
    // ==============================

    if (
        e.target.classList.contains(
            "product-buy-again"
        )
    ) {

        const productId =
            Number(
                e.target.dataset.productId
            );


        const cart =
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];


        const existingProduct =
            cart.find(
                item => item.id === productId
            );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({

                id: productId,

                quantity: 1

            });

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        alert(
            "Product added to cart!"
        );


        window.location.href =
            "cart.html";

    }


    // ==============================
    // CANCEL INDIVIDUAL PRODUCT
    // ==============================

    if (
        e.target.classList.contains(
            "product-cancel-btn"
        )
    ) {

        const orderId =
            Number(
                e.target.dataset.orderId
            );


        const productId =
            Number(
                e.target.dataset.productId
            );


        const confirmCancel =
            confirm(
                "Are you sure you want to cancel this product?"
            );


        if (!confirmCancel) {
            return;
        }


        // Find Order

        const order =
            orders.find(
                order =>
                    Number(order.id) === orderId
            );


        if (!order) {

            alert(
                "Order not found."
            );

            return;
        }


        // Find Product Inside Order

        const cartItem =
            order.items.find(
                item =>
                    Number(item.id) === productId
            );


        if (!cartItem) {

            alert(
                "Product not found."
            );

            return;
        }


        // Cancel Only This Product

        cartItem.cancelled = true;


        // Save Updated Orders

        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        alert(
            "Product cancelled successfully!"
        );


        location.reload();

    }

});