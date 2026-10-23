const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.querySelector(".cart-container");

// ==============================
// DISPLAY CART PRODUCTS
// ==============================

let totalPrice = 0;
let totalItems = 0;

cart.forEach((item) => {

    const selectedProduct =
        product.find(p => p.id === item.id);

    if (!selectedProduct) return;

    totalPrice +=
        selectedProduct.price * item.quantity;

    totalItems += item.quantity;

    cartContainer.innerHTML += `

        <div class="cart-item">

            <img
                src="${selectedProduct.image}"
                alt="${selectedProduct.name}"
            >

            <div class="cart-details">

                <h3>
                    ${selectedProduct.name}
                </h3>

                <p>
                    ₹${selectedProduct.price.toLocaleString("en-IN")}
                </p>


                <div class="quantity-box">

                    <button
                        class="minus-btn"
                        data-id="${item.id}"
                    >
                        -
                    </button>


                    <span class="quantity">
                        ${item.quantity}
                    </span>


                    <button
                        class="plus-btn"
                        data-id="${item.id}"
                    >
                        +
                    </button>

                </div>


                <button
                    class="remove-btn"
                    data-id="${item.id}"
                >
                    Remove
                </button>

            </div>

        </div>

    `;

});


// ==============================
// CART TOTAL
// ==============================

document.getElementById("total-price").textContent =
    "₹" + totalPrice.toLocaleString("en-IN");

document.getElementById("total-items").textContent =
    totalItems;


// ==============================
// CLICK EVENTS
// ==============================

document.addEventListener("click", function (e) {


    // ==========================
    // PLUS BUTTON
    // ==========================

    if (e.target.classList.contains("plus-btn")) {

        const id =
            Number(e.target.dataset.id);


        const item =
            cart.find(product => product.id === id);


        if (item) {

            item.quantity++;

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        location.reload();

    }


    // ==========================
    // MINUS BUTTON
    // ==========================

    if (e.target.classList.contains("minus-btn")) {

        const id =
            Number(e.target.dataset.id);


        const item =
            cart.find(product => product.id === id);


        if (item) {

            if (item.quantity > 1) {

                // Quantity decrease
                item.quantity--;

            } else {

                // Quantity 1 → Remove product
                const index =
                    cart.findIndex(
                        product => product.id === id
                    );


                if (index !== -1) {

                    cart.splice(index, 1);

                }

            }

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        location.reload();

    }


    // ==========================
    // REMOVE BUTTON
    // ==========================

    if (e.target.classList.contains("remove-btn")) {

        const id =
            Number(e.target.dataset.id);


        const index =
            cart.findIndex(
                item => item.id === id
            );


        if (index !== -1) {

            cart.splice(index, 1);

        }


        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        location.reload();

    }

});