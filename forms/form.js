
// Get the form elements
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const biograph = document.getElementById("biograph");
const description = document.getElementById("description");

// Add event listener for form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent the form from submitting

    // check if fields are empty
    if (!username.value || !email.value || !password.value) {
        alert("Username, email and password are required fields");
        return;
    }

    // check if email is valid
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        alert("Invalid email address");
        return;
    }

    // check if password is at least 8 characters long
    if (password.value.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
    }

    // send the form data to the server
    // ...
});
