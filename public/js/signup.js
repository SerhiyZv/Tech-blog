const signupForm = document.querySelector("#signup");
const passwordField = document.querySelector("#signupPassword");
const verifyField = document.querySelector("#verifyPassword");
const passwordEye = document.querySelector("#password-eye");
const verifyEye = document.querySelector("#verify-eye");
const submitButton = document.querySelector("#submitButton");

const registerUser = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#signupUsername").value.trim();
    const email = document.querySelector("#signupEmail").value.trim();
    
    const password = passwordField.value.trim();

    if (validate()) {
        const usernameResponse = await fetch('/api/users/signup-username', {
            method: "POST",
            body: JSON.stringify({
                name: username
            }),
            headers: { 'Content-Type': 'application/json' }
        })

        // If username is not taken, confirm email is unique
        if (usernameResponse.ok) {

            // Confirms there are no matching emails in database already
            const emailResponse = await fetch('/api/users/signup-email', {
                method: "POST",
                body: JSON.stringify({
                    email: email
                }),
                headers: { 'Content-Type': 'application/json' }
            })

            // If email is not taken, submit user info to create account
            if (emailResponse.ok) {
                const userResponse = await fetch('/api/users/signup-create', {
                    method: "POST",
                    body: JSON.stringify({ 
                        name: username,
                        email: email,
                        password: password
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (userResponse.ok) {
                    // Wait 0.5 seconds for session cookie to update so that user is now flagged as logged in before redirecting
                    setTimeout(() => {
                        document.location.replace('/dashboard');
                    }, 500);
                } else {
                    alert("Server error: Please try again")
                }

            } else {
                alert("Email already exists");
            }

        } else {
            alert("Username already exists")
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

const revealPassword = ({ target }) => {
    if (target === passwordEye) {
        // Switch icon
        passwordEye.classList.toggle("fa-eye-slash");

        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
    } else if (target === verifyEye) {
        // Switch icon
        verifyEye.classList.toggle("fa-eye-slash");

        const type = verifyField.getAttribute('type') === 'password' ? 'text' : 'password';
        verifyField.setAttribute('type', type);
    }
}

signupForm.addEventListener("input", validate);
signupForm.addEventListener("submit", registerUser);
passwordEye.addEventListener("click", revealPassword);
verifyEye.addEventListener("click", revealPassword);

validate();