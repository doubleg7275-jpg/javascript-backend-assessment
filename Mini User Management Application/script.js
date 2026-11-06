// ===================================
// 1. CREATE THE USERS ARRAY
// ===================================

let users = [];

let nextUserId = 1;


// ===================================
// 2. GET HTML ELEMENTS
// ===================================

const userForm = document.getElementById("userForm");
const message = document.getElementById("message");
const usersList = document.getElementById("usersList");


// ===================================
// 3. INPUT VALIDATION
// ===================================

function validateUser(fullName, email, age, currentUserId = null) {

    fullName = fullName.trim();
    email = email.trim().toLowerCase();
    age = Number(age);

    if (fullName === "") {
        throw new Error("Full name is required.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        throw new Error("Please enter a valid email address.");
    }

    if (!Number.isInteger(age) || age <= 0) {
        throw new Error("Please enter a valid age.");
    }

    // Prevent duplicate email addresses
    const emailExists = users.some(function(user) {
        return user.email === email && user.id !== currentUserId;
    });

    if (emailExists) {
        throw new Error("This email address is already registered.");
    }

    return {
        fullName: fullName,
        email: email,
        age: age
    };
}


// ===================================
// 4. REGISTER A NEW USER
// ===================================

function registerUser(fullName, email, age) {

    const validUser = validateUser(fullName, email, age);

    const newUser = {
        id: nextUserId,
        fullName: validUser.fullName,
        email: validUser.email,
        age: validUser.age,
        registrationDate: new Date().toLocaleDateString()
    };

    users.push(newUser);

    nextUserId++;

    return newUser;
}


// ===================================
// 5. RETRIEVE ALL REGISTERED USERS
// ===================================

function getAllUsers() {

    return [...users];

}


// ===================================
// 6. RETRIEVE A SINGLE USER BY ID
// ===================================

function getUserById(id) {

    const user = users.find(function(user) {
        return user.id === Number(id);
    });

    return user;
}


// ===================================
// 7. UPDATE USER INFORMATION
// ===================================

function updateUser(id, fullName, email, age) {

    const user = getUserById(id);

    if (!user) {
        throw new Error("User not found.");
    }

    const validUser = validateUser(fullName, email, age, user.id);

    user.fullName = validUser.fullName;
    user.email = validUser.email;
    user.age = validUser.age;

    return user;
}


// ===================================
// 8. DELETE A USER
// ===================================

function deleteUser(id) {

    const user = getUserById(id);

    if (!user) {
        throw new Error("User not found.");
    }

    users = users.filter(function(user) {
        return user.id !== Number(id);
    });

    return user;
}


// ===================================
// 9. SEARCH USERS BY NAME
// ===================================

function searchUsersByName(name) {

    return users.filter(function(user) {
        return user.fullName.toLowerCase().includes(name.toLowerCase());
    });

}


// ===================================
// 10. DISPLAY USERS
// ===================================

// Prevent user input from being interpreted as HTML
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

        const characters = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return characters[character];

    });

}


function displayUsers(userList, container) {

    if (userList.length === 0) {

        container.innerHTML = "<p>No users found.</p>";

        return;
    }

    container.innerHTML = userList.map(function(user) {

        return `
            <div class="user-card">

                <h3>${escapeHTML(user.fullName)}</h3>

                <p><strong>ID:</strong> ${user.id}</p>

                <p><strong>Email:</strong> ${escapeHTML(user.email)}</p>

                <p><strong>Age:</strong> ${user.age}</p>

                <p><strong>Registration Date:</strong>
                    ${escapeHTML(user.registrationDate)}
                </p>

                <button class="edit-btn" data-action="edit" data-id="${user.id}">
                    Edit User
                </button>

                <button class="delete-btn" data-action="delete" data-id="${user.id}">
                    Delete User
                </button>

            </div>
        `;

    }).join("");

}


// ===================================
// 11. DISPLAY SUCCESS AND ERROR MESSAGES
// ===================================

function showMessage(text, type) {

    message.textContent = text;

    message.className = type;

}


// ===================================
// 12. REGISTER AND UPDATE FORM
// ===================================

userForm.addEventListener("submit", function(event) {

    event.preventDefault();

    try {

        const fullName = document.getElementById("fullName").value;

        const email = document.getElementById("email").value;

        const age = document.getElementById("age").value;

        const editingId = document.getElementById("editingUserId").value;

        if (editingId) {

            updateUser(editingId, fullName, email, age);

            showMessage("User information updated successfully!", "success");

        } else {

            registerUser(fullName, email, age);

            showMessage("User registered successfully!", "success");

        }

        userForm.reset();

        document.getElementById("editingUserId").value = "";

        document.getElementById("submitBtn").textContent = "Register User";

        document.getElementById("cancelEditBtn").hidden = true;

        usersList.hidden = true;
        usersList.innerHTML = "";

    } catch (error) {

        showMessage(error.message, "error");

    }

});


// ===================================
// 13. VIEW ALL USERS
// ===================================

document.getElementById("getAllBtn").addEventListener("click", function() {

    const allUsers = getAllUsers();

    usersList.hidden = false;

    displayUsers(allUsers, usersList);

});


// ===================================
// 14. FIND USER BY ID
// ===================================

document.getElementById("getUserBtn").addEventListener("click", function() {

    try {

        const id = document.getElementById("userId").value;

        if (id.trim() === "" || !Number.isInteger(Number(id)) || Number(id) <= 0) {
            throw new Error("Please enter a valid user ID.");
        }

        const user = getUserById(id);

        const container = document.getElementById("singleUserResult");

        if (!user) {

            container.innerHTML = "<p class='error'>User not found.</p>";

        } else {

            displayUsers([user], container);

        }

    } catch (error) {

        document.getElementById("singleUserResult").innerHTML =
            `<p class="error">${escapeHTML(error.message)}</p>`;

    }

});


// ===================================
// 15. SEARCH USERS BY NAME
// ===================================

document.getElementById("searchBtn").addEventListener("click", function() {

    const name = document.getElementById("searchName").value.trim();

    const container = document.getElementById("searchResults");

    if (name === "") {

        container.innerHTML = "<p class='error'>Please enter a name to search.</p>";

        return;
    }

    const matchingUsers = searchUsersByName(name);

    displayUsers(matchingUsers, container);

});


// ===================================
// 16. EDIT AND DELETE USERS
// ===================================

usersList.addEventListener("click", function(event) {

    const button = event.target.closest("button[data-action]");

    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);

    const action = button.dataset.action;

    try {

        if (action === "delete") {

            const deletedUser = deleteUser(id);

            showMessage(
                deletedUser.fullName + " has been deleted.",
                "success"
            );

            if (!usersList.hidden) {
                displayUsers(getAllUsers(), usersList);
            }

        }

        else if (action === "edit") {

            const user = getUserById(id);

            if (!user) {
                throw new Error("User not found.");
            }

            document.getElementById("fullName").value = user.fullName;

            document.getElementById("email").value = user.email;

            document.getElementById("age").value = user.age;

            document.getElementById("editingUserId").value = user.id;

            document.getElementById("submitBtn").textContent = "Update User";

            document.getElementById("cancelEditBtn").hidden = false;

            showMessage("You can now edit the user's information.", "success");

            document.getElementById("fullName").focus();

        }

    } catch (error) {

        showMessage(error.message, "error");

    }

});


// ===================================
// 17. CANCEL UPDATE
// ===================================

document.getElementById("cancelEditBtn").addEventListener("click", function() {

    userForm.reset();

    document.getElementById("editingUserId").value = "";

    document.getElementById("submitBtn").textContent = "Register User";

    this.hidden = true;

    showMessage("Update cancelled.", "success");

});