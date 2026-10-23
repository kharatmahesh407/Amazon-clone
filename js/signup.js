console.log("Signup JS Loaded");

const signupForm =
    document.querySelector("#signup-form");


signupForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();


        const name =
            document.querySelector("#name").value.trim();

        const email =
            document.querySelector("#email").value.trim();

        const password =
            document.querySelector("#password").value;

        const confirmPassword =
            document.querySelector("#confirm-password").value;


        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        if (password.length < 6) {

            alert(
                "Password must be at least 6 characters."
            );

            return;
        }


        // Demo account data

        const user = {

            name: name,

            email: email,

            password: password

        };


        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );


        alert(
            "Account created successfully!"
        );


        window.location.href =
            "login.html";

    }
);