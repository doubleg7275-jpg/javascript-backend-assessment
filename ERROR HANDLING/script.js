const form = document.getElementById("registrationForm");
const message = document.getElementById("message");


form.addEventListener("submit", function(event) {

    event.preventDefault();

    try {

        let name = document.getElementById("fullName").value.trim();
        let email = document.getElementById("email").value.trim();
        let age = Number(document.getElementById("age").value);
        let password = document.getElementById("password").value;

        if (name === "") {
            throw new Error("Full name is required.");
        }

       
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            throw new Error("Please enter a valid email address.");
        }

        if (age < 18 || document.getElementById("age").value === "") {
            throw new Error("You must be at least 18 years old.");
        }

        const missingRequirements = [];

        if (password.length < 8) {
            missingRequirements.push("at least 8 characters");
        }
        if (!/[A-Z]/.test(password)) {
            missingRequirements.push("at least one uppercase letter");
        }
        if (!/[a-z]/.test(password)) {
            missingRequirements.push("at least one lowercase letter");
        }
        if (!/[0-9]/.test(password)) {
            missingRequirements.push("at least one number");
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            missingRequirements.push("at least one special character");
        }
        if (missingRequirements.length > 0) {
            throw new Error(`Password error: please include ${missingRequirements.join(", ")}.`);
        }

        message.innerHTML = "Registration successful!";

        message.style.color = "green";

        form.reset();

    } catch (error) {

        message.innerHTML = error.message;

        message.style.color = "red";

    }

});