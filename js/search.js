console.log("Search JS Loaded");


// ========================================
// SEARCH ELEMENTS
// ========================================

const searchInput =
    document.querySelector("#search-input");

const searchButton =
    document.querySelector("#search-btn");

const suggestionsBox =
    document.querySelector("#search-suggestions");

const searchCategory =
    document.querySelector(".search-category");


// ========================================
// GET SELECTED CATEGORY
// ========================================

function getSelectedCategory() {

    if (!searchCategory) {
        return "all";
    }

    return searchCategory.value
        .trim()
        .toLowerCase();
}


// ========================================
// FIND MATCHING PRODUCTS
// ========================================

function getMatchingProducts(searchText) {

    const selectedCategory =
        getSelectedCategory();

    return product.filter(function (item) {

        const productName =
            item.name.toLowerCase();

        const productCategory =
            item.category
                ? item.category.toLowerCase()
                : "";

        const matchesSearch =
            productName.includes(searchText);


        // ALL CATEGORY
        if (selectedCategory === "all") {

            return matchesSearch;

        }


        // SELECTED CATEGORY
        const matchesCategory =
            productCategory === selectedCategory;


        return (
            matchesSearch &&
            matchesCategory
        );

    });
}


// ========================================
// SHOW SEARCH SUGGESTIONS
// ========================================

function showSuggestions(matchingProducts) {

    if (!suggestionsBox) return;


    suggestionsBox.innerHTML = "";


    // NO PRODUCTS
    if (matchingProducts.length === 0) {

        suggestionsBox.innerHTML = `

            <div class="no-search-result">

                No products found

            </div>

        `;

        suggestionsBox.style.display =
            "block";

        return;
    }


    // CREATE SUGGESTIONS

    matchingProducts
        .slice(0, 6)
        .forEach(function (item) {

            suggestionsBox.innerHTML += `

                <div
                    class="search-suggestion"
                    data-product-id="${item.id}"
                >

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >


                    <div
                        class="search-suggestion-info"
                    >

                        <span
                            class="search-suggestion-name"
                        >
                            ${item.name}
                        </span>


                        <span
                            class="search-suggestion-price"
                        >
                            ₹${item.price.toLocaleString("en-IN")}
                        </span>

                    </div>

                </div>

            `;

        });


    suggestionsBox.style.display =
        "block";
}


// ========================================
// HIDE SUGGESTIONS
// ========================================

function hideSuggestions() {

    if (!suggestionsBox) return;

    suggestionsBox.innerHTML = "";

    suggestionsBox.style.display =
        "none";
}


// ========================================
// SEARCH INPUT
// ========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchText =
                searchInput.value
                    .trim()
                    .toLowerCase();


            // EMPTY SEARCH

            if (searchText === "") {

                hideSuggestions();

                return;
            }


            // FIND PRODUCTS

            const matchingProducts =
                getMatchingProducts(searchText);


            // SHOW SUGGESTIONS

            showSuggestions(
                matchingProducts
            );

        }
    );

}


// ========================================
// SEARCH BUTTON
// ========================================

if (searchButton) {

    searchButton.addEventListener(
        "click",
        function () {

            const searchText =
                searchInput.value
                    .trim()
                    .toLowerCase();


            // EMPTY SEARCH

            if (searchText === "") {

                alert(
                    "Please enter a product name."
                );

                return;
            }


            // FIND PRODUCTS

            const matchingProducts =
                getMatchingProducts(searchText);


            // PRODUCT FOUND

            if (matchingProducts.length > 0) {

                const searchQuery =
                    encodeURIComponent(searchText);

                window.location.href =
                    `index.html?search=${searchQuery}`;

            } else {

                alert(
                    "No products found."
                );

            }
        }
    );

}


// ========================================
// ENTER KEY
// ========================================

if (searchInput) {

    searchInput.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Enter") {

                e.preventDefault();


                if (searchButton) {

                    searchButton.click();

                }

            }

        }
    );

}


// ========================================
// CLICK SEARCH SUGGESTION
// ========================================

document.addEventListener(
    "click",
    function (e) {

        const suggestion =
            e.target.closest(
                ".search-suggestion"
            );


        if (!suggestion) return;


        const productId =
            suggestion.dataset.productId;


        window.location.href =
            `product.html?id=${productId}`;

    }
);


// ========================================
// CATEGORY CHANGE
// ========================================

if (searchCategory) {

    searchCategory.addEventListener(
        "change",
        function () {

            const searchText =
                searchInput.value
                    .trim()
                    .toLowerCase();


            // EMPTY SEARCH

            if (searchText === "") {

                hideSuggestions();

                return;
            }


            // FILTER PRODUCTS

            const matchingProducts =
                getMatchingProducts(searchText);


            showSuggestions(
                matchingProducts
            );

        }
    );

}


// ========================================
// CLOSE SUGGESTIONS
// ========================================

document.addEventListener(
    "click",
    function (e) {

        if (
            !e.target.closest(".nav-search")
        ) {

            hideSuggestions();

        }

    }
);

// ==============================
// CATEGORY FILTER
// ==============================

if (searchCategory) {

    searchCategory.addEventListener(
        "change",
        function () {

            const selectedCategory =
                searchCategory.value
                    .trim()
                    .toLowerCase();


            // ==============================
            // ALL PRODUCTS
            // ==============================

            if (selectedCategory === "all") {

                displayProducts(product);

                return;
            }


            // ==============================
            // FILTER CATEGORY
            // ==============================

            const filteredProducts =
                product.filter(function (item) {

                    return item.category
                        .toLowerCase() === selectedCategory;

                });


            // ==============================
            // DISPLAY PRODUCTS
            // ==============================

            if (filteredProducts.length > 0) {

                displayProducts(filteredProducts);

            } else {

                const productContainer =
                    document.querySelector(".product");


                if (productContainer) {

                    productContainer.innerHTML = `

                        <div class="no-search-result">

                            <h2>
                                No products found
                            </h2>

                            <p>
                                No products available in
                                ${searchCategory.value}.
                            </p>

                        </div>

                    `;

                }

            }


            // Clear search box

            if (searchInput) {

                searchInput.value = "";

            }


            // Close suggestions

            if (suggestionsBox) {

                suggestionsBox.innerHTML = "";

                suggestionsBox.style.display =
                    "none";

            }

        }
    );

}