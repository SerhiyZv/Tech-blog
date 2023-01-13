const loginForm = document.querySelector("#login");

const logUserIn = async (event) => {
    event.preventDefault();

    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert("Email or password not recognized. Please try again.")
        }

    } else if (!email && !password) {
        alert("Enter email and password");
    } else if (!email) {
        alert("Enter email");
    } else if (!password) {
        alert("Enter password");
    }
}

loginForm.addEventListener("submit", logUserIn);