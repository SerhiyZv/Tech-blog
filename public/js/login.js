const loginForm = document.querySelector("#login");
const eyeIcon = document.querySelector(".reveal");
const passwordField = document.querySelector("#loginPassword");

const logUserIn = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#loginEmail").value.trim();
    const password = passwordField.value.trim();

    const response = await fetch('/api/users/login', {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        setTimeout(() => {
            document.location.replace('/dashboard');
        }, 500);
    } else {
        alert("Email or password not recognized. Please try again.")
    }
}

const revealPassword = () => {
    // Switch icon
    eyeIcon.classList.toggle("fa-eye-slash");

    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
}

loginForm.addEventListener("submit", logUserIn);
eyeIcon.addEventListener("click", revealPassword);