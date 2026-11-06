const searchBtn = document.getElementById("search-btn");
const emailSearchBtn = document.getElementById("Search by Email");

searchBtn.addEventListener("click", () => searchUsers("name"));
emailSearchBtn.addEventListener("click", () => searchUsers("email"));

async function searchUsers(searchField) {
  const usersInput = document
    .getElementById("User-name")
    .value
    .trim()
    .toLowerCase();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");

    const users = await res.json();
    const matchingUsers = users.filter((user) =>
      user[searchField].toLowerCase().includes(usersInput)
    );

    if (matchingUsers.length === 0) {
      resultsDiv.innerHTML = "No users found";
      return;
    }

    resultsDiv.innerHTML = "";

    matchingUsers.forEach((user) => {
      const userDiv = document.createElement("div");
      userDiv.classList.add("user");

      userDiv.innerHTML = `
        <h2>${user.name}</h2>
        <p>Email: ${user.email}</p>
      `;

      resultsDiv.appendChild(userDiv);
    });
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "Unable to load users. Please try again.";
  }
}
