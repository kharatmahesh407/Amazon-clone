const banners = [
    "assets/images/banner1.jpg",
    "assets/images/banner2.jpg",
    "assets/images/banner3.jpg",
    "assets/images/banner4.jpg"
];

let currentBanner = 0;

const heroImage = document.getElementById("hero-image");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");


function showBanner(index) {

    if (index >= banners.length) {
        currentBanner = 0;
    }

    if (index < 0) {
        currentBanner = banners.length - 1;
    }

    heroImage.src = banners[currentBanner];
}


// NEXT
nextBtn.addEventListener("click", function () {

    currentBanner++;

    showBanner(currentBanner);

});


// PREVIOUS
prevBtn.addEventListener("click", function () {

    currentBanner--;

    showBanner(currentBanner);

});


// AUTO SLIDER
setInterval(function () {

    currentBanner++;

    showBanner(currentBanner);

}, 5000);