console.log("Main JS Loaded");


// ==============================
// DISPLAY PRODUCTS
// ==============================

const productContainer =
    document.querySelector(".product");


function displayProducts(productsArray) {

    if (!productContainer) return;

    productContainer.innerHTML = "";


    productsArray.forEach((item) => {

        productContainer.innerHTML += `

            <div class="card">

                <a
                    href="product.html?id=${item.id}"
                    class="product-link"
                >

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>

                    <span>
                        ${item.rating}
                    </span>

                </a>


                <button
                    type="button"
                    class="add-to-cart"
                    data-id="${item.id}"
                >
                    Add to Cart
                </button>

            </div>

        `;
    });
}
                                                 

// ==============================
// SHOW PRODUCTS
// ==============================

const urlParams =
    new URLSearchParams(window.location.search);

const searchQuery =
    urlParams.get("search");


if (searchQuery) {

    const searchText =
        searchQuery.toLowerCase().trim();


    const filteredProducts =
        product.filter(function (item) {

            return item.name
                .toLowerCase()
                .includes(searchText);

        });


    displayProducts(filteredProducts);

} else {

    displayProducts(product);

}



// ==============================
// CART
// ==============================

const cart =
    JSON.parse(
        localStorage.getItem("cart")
    ) || [];


const cartCount =
    document.querySelector("#cart-count");


function updateCartCount() {

    if (!cartCount) return;


    const totalItems =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity || 1),
            0
        );


    cartCount.textContent =
        totalItems;
}


updateCartCount();


// ==============================
// ADD TO CART
// ==============================

document.addEventListener(
    "click",
    function (e) {

        if (
            e.target.classList.contains(
                "add-to-cart"
            )
        ) {

            console.log(
                "Add to Cart Clicked"
            );


            const id =
                Number(
                    e.target.dataset.id
                );


            const existingProduct =
                cart.find(
                    item => item.id === id
                );


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    id: id,

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

    }
);


// ==============================
// USER LOGIN + LOGOUT
// ==============================

const userLink =
    document.querySelector("#user-link");

const logoutBtn =
    document.querySelector("#logout-btn");

const loggedInUser =
    JSON.parse(
        localStorage.getItem("loggedInUser")
    );


// ==============================
// SHOW ACCOUNT
// ==============================

if (loggedInUser) {

    if (userLink) {

        userLink.innerHTML = `
            <span class="account-small">
                Hello, ${loggedInUser.name}
            </span>

            <span class="account-main">
                Account &amp; Lists
                <span class="nav-arrow">▼</span>
            </span>
        `;

        userLink.href = "#";
    }


    if (logoutBtn) {

        logoutBtn.style.display =
            "inline-block";

    }

} else {

    if (userLink) {

        userLink.innerHTML = `
            <span class="account-small">
                Hello, sign in
            </span>

            <span class="account-main">
                Account &amp; Lists
                <span class="nav-arrow">▼</span>
            </span>
        `;

        userLink.href =
            "login.html";
    }


    if (logoutBtn) {

        logoutBtn.style.display =
            "none";

    }

}


// ==============================
// LOGOUT
// ==============================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "loggedInUser"
            );

            alert(
                "Logged out successfully!"
            );

            window.location.href =
                "index.html";

        }
    );

}