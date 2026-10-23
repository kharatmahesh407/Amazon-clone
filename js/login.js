console.log("Login JS Loaded");

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    // Signup केलेला user मिळवा
    const savedUser = JSON.parse(
        localStorage.getItem("user")
    );

    // Account नाही
    if (!savedUser) {

        alert("No account found. Please create an account first.");

        return;
    }

    // Email आणि password check
    const user =
        savedUser.email === email &&
        savedUser.password === password
            ? savedUser
            : null;


    // ==============================
    // LOGIN SUCCESS
    // ==============================

    if (user) {

        localStorage.setItem(
            "loggedInUser",
            JSON.stringify(user)
        );

        alert("Login successful!");

        window.location.href = "index.html";

    } else {

        // ==============================
        // LOGIN FAILED
        // ==============================

        alert("Invalid email or password.");

    }

});