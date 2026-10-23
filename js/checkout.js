console.log("Checkout JS Loaded");


// ==============================
// CART
// ==============================

const cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ==============================
// CHECKOUT ELEMENTS
// ==============================

const checkoutItems =
    document.querySelector("#checkout-items");

const summaryItems =
    document.querySelector("#summary-items");

const summaryTotal =
    document.querySelector("#summary-total");


// ==============================
// ADDRESS ELEMENTS
// ==============================

const savedAddress =
    document.querySelector("#saved-address");

const addressDisplay =
    document.querySelector("#address-display");

const changeAddressBtn =
    document.querySelector("#change-address-btn");

const addressForm =
    document.querySelector("#address-form");

const saveAddressBtn =
    document.querySelector("#save-address-btn");

const cancelAddressBtn =
    document.querySelector("#cancel-address-btn");


// ==============================
// ADDRESS INPUTS
// ==============================

const addressName =
    document.querySelector("#address-name");

const addressMobile =
    document.querySelector("#address-mobile");

const addressPincode =
    document.querySelector("#address-pincode");

const addressHouse =
    document.querySelector("#address-house");

const addressArea =
    document.querySelector("#address-area");

const addressCity =
    document.querySelector("#address-city");

const addressState =
    document.querySelector("#address-state");



    // ==============================
// CURRENT LOCATION
// ==============================

const currentLocationBtn =
    document.querySelector("#current-location-btn");

const locationStatus =
    document.querySelector("#location-status");

const mapLink =
    document.querySelector("#map-link");


if (currentLocationBtn) {

    currentLocationBtn.addEventListener(
        "click",
        function () {

            if (!navigator.geolocation) {

                alert(
                    "Geolocation is not supported by your browser."
                );

                return;
            }


            locationStatus.textContent =
                "📍 Getting your current location...";


            navigator.geolocation.getCurrentPosition(

                function (position) {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;


                    console.log(
                        "Latitude:",
                        latitude
                    );

                    console.log(
                        "Longitude:",
                        longitude
                    );


                    // Map URL

                    const mapUrl =
                        `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;


                    mapLink.href =
                        mapUrl;

                    mapLink.style.display =
                        "inline-block";


                    locationStatus.textContent =
                        "✅ Current location found!";


                    // Save coordinates

                    const locationData = {

                        latitude:
                            latitude,

                        longitude:
                            longitude

                    };


                    localStorage.setItem(
                        "currentLocation",
                        JSON.stringify(locationData)
                    );


                    // Open map

                    window.open(
                        mapUrl,
                        "_blank"
                    );

                },


                function (error) {

                    console.log(
                        "Location Error:",
                        error
                    );


                    if (error.code === 1) {

                        alert(
                            "Location permission denied. Please allow location access."
                        );

                    } else if (error.code === 2) {

                        alert(
                            "Location could not be determined."
                        );

                    } else {

                        alert(
                            "Unable to get your location."
                        );

                    }


                    locationStatus.textContent =
                        "❌ Location not available.";

                },

                {

                    enableHighAccuracy: true,

                    timeout: 10000,

                    maximumAge: 0

                }

            );

        }
    );

}



// ==============================
// TOTALS
// ==============================

let totalItems = 0;

let totalPrice = 0;


// ==============================
// DISPLAY CART
// ==============================

if (cart.length === 0) {

    checkoutItems.innerHTML = `

        <p>
            Your cart is empty.
        </p>

        <a href="index.html">
            Continue Shopping
        </a>

    `;

} else {

    cart.forEach(function (cartItem) {

        const selectedProduct =
            product.find(
                item => item.id === cartItem.id
            );


        if (!selectedProduct) {
            return;
        }


        const quantity =
            Number(cartItem.quantity) || 1;


        const itemTotal =
            selectedProduct.price * quantity;


        totalItems += quantity;

        totalPrice += itemTotal;


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <img
                    src="${selectedProduct.image}"
                    alt="${selectedProduct.name}"
                >

                <div class="checkout-item-info">

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

                </div>

            </div>

        `;

    });

}


// ==============================
// SUMMARY
// ==============================

if (summaryItems) {

    summaryItems.textContent =
        totalItems;

}


if (summaryTotal) {

    summaryTotal.textContent =
        `₹${totalPrice.toLocaleString("en-IN")}`;

}


// ==============================
// LOAD SAVED ADDRESS
// ==============================

function loadAddress() {

    const address =
        JSON.parse(
            localStorage.getItem("deliveryAddress")
        );


    if (!address) {

        addressDisplay.innerHTML = `
            No address added yet.
        `;

        return;

    }


    addressDisplay.innerHTML = `

        <strong>
            ${address.name}
        </strong>

        <br>

        ${address.house},

        ${address.area}

        <br>

        ${address.city},

        ${address.state}

        -

        ${address.pincode}

        <br>

        Mobile:
        ${address.mobile}

    `;

}


loadAddress();


// ==============================
// CHANGE / ADD ADDRESS
// ==============================

if (changeAddressBtn) {

    changeAddressBtn.addEventListener(
        "click",
        function () {

            const address =
                JSON.parse(
                    localStorage.getItem(
                        "deliveryAddress"
                    )
                );


            // Load existing address
            if (address) {

                addressName.value =
                    address.name || "";

                addressMobile.value =
                    address.mobile || "";

                addressPincode.value =
                    address.pincode || "";

                addressHouse.value =
                    address.house || "";

                addressArea.value =
                    address.area || "";

                addressCity.value =
                    address.city || "";

                addressState.value =
                    address.state || "";

            }


            addressForm.style.display =
                "block";

        }
    );

}


// ==============================
// SAVE ADDRESS
// ==============================

if (saveAddressBtn) {

    saveAddressBtn.addEventListener(
        "click",
        function () {


            const name =
                addressName.value.trim();

            const mobile =
                addressMobile.value.trim();

            const pincode =
                addressPincode.value.trim();

            const house =
                addressHouse.value.trim();

            const area =
                addressArea.value.trim();

            const city =
                addressCity.value.trim();

            const state =
                addressState.value.trim();


            // ==============================
            // VALIDATION
            // ==============================

            if (
                !name ||
                !mobile ||
                !pincode ||
                !house ||
                !area ||
                !city ||
                !state
            ) {

                alert(
                    "Please fill all address details."
                );

                return;

            }


            if (
                mobile.length !== 10 ||
                !/^[0-9]+$/.test(mobile)
            ) {

                alert(
                    "Please enter a valid 10 digit mobile number."
                );

                return;

            }


            if (
                pincode.length !== 6 ||
                !/^[0-9]+$/.test(pincode)
            ) {

                alert(
                    "Please enter a valid 6 digit PIN code."
                );

                return;

            }


            // ==============================
            // CREATE ADDRESS
            // ==============================

            const address = {

                name: name,

                mobile: mobile,

                pincode: pincode,

                house: house,

                area: area,

                city: city,

                state: state

            };


            // ==============================
            // SAVE LOCAL STORAGE
            // ==============================

            localStorage.setItem(
                "deliveryAddress",
                JSON.stringify(address)
            );


            // ==============================
            // UPDATE DISPLAY
            // ==============================

            loadAddress();


            // Hide form

            addressForm.style.display =
                "none";


            alert(
                "Address saved successfully!"
            );

        }
    );

}


// ==============================
// CANCEL ADDRESS
// ==============================

if (cancelAddressBtn) {

    cancelAddressBtn.addEventListener(
        "click",
        function () {

            addressForm.style.display =
                "none";

        }
    );

}


// ==============================
// PLACE ORDER
// ==============================

const placeOrderButton =
    document.querySelector("#place-order");


if (placeOrderButton) {

    placeOrderButton.addEventListener(
        "click",
        function () {


            // ==============================
            // CHECK CART
            // ==============================

            if (cart.length === 0) {

                alert(
                    "Your cart is empty!"
                );

                return;

            }


            // ==============================
            // CHECK ADDRESS
            // ==============================

            const savedDeliveryAddress =
                JSON.parse(
                    localStorage.getItem(
                        "deliveryAddress"
                    )
                );


            if (!savedDeliveryAddress) {

                alert(
                    "Please add your delivery address first."
                );


                addressForm.style.display =
                    "block";


                return;

            }


            // ==============================
            // PAYMENT METHOD
            // ==============================

            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            const paymentMethod =
                selectedPayment
                    ? selectedPayment.parentElement.textContent.trim()
                    : "Cash on Delivery";


            // ==============================
            // CREATE ORDER ITEMS
            // ==============================

            const orderItems =
                cart.map(function (cartItem, index) {

                    const deliveryDate =
                        new Date();


                    deliveryDate.setDate(
                        deliveryDate.getDate()
                        + 3
                        + (index * 2)
                    );


                    return {

                        id: cartItem.id,

                        quantity:
                            cartItem.quantity,

                        deliveryDate:
                            deliveryDate.toLocaleDateString(
                                "en-IN",
                                {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                }
                            )

                    };

                });


            // ==============================
            // CREATE ORDER
            // ==============================

            const order = {

                id: Date.now(),

                items: orderItems,

                totalItems:
                    totalItems,

                totalPrice:
                    totalPrice,

                paymentMethod:
                    paymentMethod,

                address:
                    savedDeliveryAddress,

                date:
                    new Date().toLocaleString()

            };


            // ==============================
            // GET OLD ORDERS
            // ==============================

            const orders =
                JSON.parse(
                    localStorage.getItem("orders")
                ) || [];


            // ==============================
            // SAVE ORDER
            // ==============================

            orders.push(order);


            localStorage.setItem(
                "orders",
                JSON.stringify(orders)
            );


            // ==============================
            // CLEAR CART
            // ==============================

            localStorage.removeItem("cart");


            // ==============================
            // SUCCESS
            // ==============================

            alert(
                "Order placed successfully!"
            );


            window.location.href =
                "order-success.html";

        }
    );

}

// ==============================
// ADDRESS FORM - ENTER TO NEXT
// ==============================

const addressFields = [

    addressName,

    addressMobile,

    addressArea,

    addressHouse,

    addressPincode,

    addressCity,

    addressState

];


addressFields.forEach(function (field, index) {

    if (!field) return;


    field.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Enter") {

                e.preventDefault();


                const nextField =
                    addressFields[index + 1];


                if (nextField) {

                    nextField.focus();

                } else {

                    // Last field असल्यामुळे
                    // Save Address वर focus

                    if (saveAddressBtn) {

                        saveAddressBtn.focus();

                    }

                }

            }

        }
    );

});