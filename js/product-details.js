console.log("Product Details JS Loaded");


// ==============================
// GET PRODUCT ID
// ==============================

const params = new URLSearchParams(
    window.location.search
);

const productId = Number(
    params.get("id")
);

console.log("Product ID:", productId);


// ==============================
// FIND PRODUCT
// ==============================

const selectedProduct = product.find(
    item => item.id === productId
);

const container = document.querySelector(
    "#product-details-container"
);


// ==============================
// DISPLAY PRODUCT
// ==============================

if (!selectedProduct) {

    container.innerHTML = `
        <div>
            <h2>Product not found</h2>

            <a href="index.html">
                Back to Home
            </a>
        </div>
    `;

} else {

    container.innerHTML = `

        <div class="product-image-section">

            <img
                src="${selectedProduct.image}"
                alt="${selectedProduct.name}"
            >

        </div>


        <div class="product-info">

            <h1>
                ${selectedProduct.name}
            </h1>

            <div class="rating">
                ${selectedProduct.rating}
            </div>

            <hr>

            <h2 class="product-price">
                ₹${selectedProduct.price.toLocaleString("en-IN")}
            </h2>

            <p class="description">
                High-quality ${selectedProduct.name}
                available at a great price.
                Fast delivery and reliable quality.
            </p>


            <div class="product-actions">

                <button
                    type="button"
                    class="add-detail-cart"
                    id="detail-add-cart"
                >
                    Add to Cart
                </button>


                <button
                    type="button"
                    class="buy-now"
                    id="buy-now"
                >
                    Buy Now
                </button>

            </div>

        </div>

    `;
}


// ==============================
// CART
// ==============================

let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];


// ==============================
// UPDATE CART COUNT
// ==============================

function updateCartCount() {

    const cartCount =
        document.querySelector("#cart-count");

    if (cartCount) {

        const totalQuantity = cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

        cartCount.textContent =
            totalQuantity;
    }
}


// Page load वर count
updateCartCount();


// ==============================
// ADD TO CART
// ==============================

const addCartButton =
    document.querySelector("#detail-add-cart");


if (addCartButton && selectedProduct) {

    addCartButton.addEventListener(
        "click",
        function () {

            const existingProduct =
                cart.find(
                    item =>
                        item.id === selectedProduct.id
                );


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({
                    id: selectedProduct.id,
                    quantity: 1
                });

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            updateCartCount();


            alert(
                "Product added to cart!"
            );

        }
    );
}


// ==============================
// BUY NOW
// ==============================

const buyNowButton =
    document.querySelector("#buy-now");


if (buyNowButton && selectedProduct) {

    buyNowButton.addEventListener(
        "click",
        function () {

            const existingProduct =
                cart.find(
                    item =>
                        item.id === selectedProduct.id
                );


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({
                    id: selectedProduct.id,
                    quantity: 1
                });

            }


            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            window.location.href =
                "cart.html";

        }
    );
}