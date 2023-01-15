const { ValidationError } = require("sequelize");

const signupForm = document.querySelector("#signup");
const passwordField = document.querySelector("#signupPassword");
const verifyField = document.querySelector("#verifyPassword");
const submitButton = document.querySelector("#submitButton");

const registerUser = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#signupUsername").value.trim();
    const email = document.querySelector("#signupEmail").value.trim();
    
    const password = passwordField.value.trim();

    if (validate()) {
        const response = await fetch('/api/users/signup', {
            method: "POST",
            body: JSON.stringify({ 
                name: username,
                email: email,
                password: password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert("Server error: Please try again")
        }
    } else {
        alert("Missing field(s)");
    }
}

const checkLength = () => {
    const password = passwordField.value.trim();
    const checkbox1 = document.querySelector("#checkbox1");

    if (password.length >= 8) {
        checkbox1.classList.remove("hide");
        return true;
    } else {
        checkbox1.classList.add("hide");
        return false;
    }
}

const verifyPassword = () => {
    // Main password field
    const password1 = passwordField.value.trim();

    // Verify password field
    const password2 = verifyField.value.trim();

    const checkbox2 = document.querySelector("#checkbox2");

    if (password1 === password2) {
        checkbox2.classList.remove("hide");
        return true;
    } else {
        checkbox2.classList.add("hide");
        return false;
    }
}

const validate = () => {
    const username = document.querySelector("#signupUsername").value.trim();
    const email = document.querySelector("#signupEmail").value.trim();

    if (
        username.length > 0 &&
        email.length > 0 &&
        checkLength() &&
        verifyPassword()
    ) {
        submitButton.removeAttribute("disabled");
        return true;
    } else {
        submitButton.setAttribute("disabled", "");
        return false;
    }
}

signupForm.addEventListener("submit", registerUser);

validate();