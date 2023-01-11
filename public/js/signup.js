const signupForm = document.querySelector("#signup");

const registerUser = async (event) => {
    event.preventDefault();

    const username = document.querySelector("#signupUsername").value.trim();
    const email = document.querySelector("#signupEmail").value.trim();
    const password = document.querySelector("#signupPassword").value.trim();

    if (username && email && password) {
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }

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

signupForm.addEventListener("submit", registerUser);