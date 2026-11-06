// Step 1: Create five user objects

const users = [
    {
        id: 1,
        name: "David",
        email: "david@gmail.com",
        age: 24
    },
    {
        id: 2,
        name: "Sarah",
        email: "sarah@gmail.com",
        age: 22
    },
    {
        id: 3,
        name: "Michael",
        email: "michael@gmail.com",
        age: 27
    },
    {
        id: 4,
        name: "Grace",
        email: "grace@gmail.com",
        age: 25
    },
    {
        id: 5,
        name: "John",
        email: "john@gmail.com",
        age: 30
    }
];


// Step 2: Convert JavaScript objects into a JSON string

const jsonString = JSON.stringify(users, null, 2);


// Display the JSON string
document.getElementById("jsonData").textContent = jsonString;


// Step 3: Convert the JSON string back into JavaScript objects

const convertedUsers = JSON.parse(jsonString);


// Step 4: Create a function to search for a user by email

function searchUser(email) {

    return convertedUsers.find(function(user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });

}


// Step 5: Display the user's information

function displayUser(user) {

    const result = document.getElementById("result");

    if (!user) {
        result.innerHTML = "<p class='error'>User not found.</p>";
        return;
    }

    result.innerHTML = `
        <div class="user-card">
            <h3>User Information</h3>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Age:</strong> ${user.age}</p>
        </div>
    `;
}


// Step 6: Add an event listener to the search button

document.getElementById("searchBtn").addEventListener("click", function() {

    const email = document.getElementById("searchEmail").value.trim();

    if (email === "") {
        document.getElementById("result").innerHTML =
            "<p class='error'>Please enter an email address.</p>";
        return;
    }

    const user = searchUser(email);

    displayUser(user);

});