let users = [];

//Functions to show and hide popups
function showPopup(popupId) {
    document.getElementById(popupId).hidden = false;
}

function hidePopup(popupId) {
    document.getElementById(popupId).hidden = true;
}

// Event listener for login
document.getElementById("login-btn").addEventListener("click", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        alert(`Welcome, ${user.first_name} ${user.last_name}!`);
        // Redirect to videos page
        window.location.href = "/videos";
    } else {
        alert("Invalid username or password.");
    }
});

// Event listener for help popup
document.getElementById("help-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    const userData = users.map((user) =>
        `Username: ${user.username}, Password: ${user.password}, Name: ${user.first_name} ${user.last_name}`
        ).join("\n");

    document.getElementById("user-data").textContent = userData;
    showPopup("help-popup");
});

document.getElementById("close-help-btn").addEventListener("click", function () {
    hidePopup("help-popup");
});

// Event listener for create account popup
document.getElementById("create-account-btn").addEventListener("click", function (event) {
    event.preventDefault();
    showPopup("create-account-popup");
});

document.getElementById("close-create-account-btn").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        hidePopup("create-account-popup");
    });

// Event listener for saving a new account
document.getElementById("save-account-btn").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    const newUser = {
        username: document.getElementById("new-username").value.trim(),
        password: document.getElementById("new-password").value.trim(),
        first_name: document.getElementById("first-name").value.trim(),
        last_name: document.getElementById("last-name").value.trim(),
    };

    if (
        newUser.username &&
        newUser.password &&
        newUser.first_name &&
        newUser.last_name
    ) {
        const isDuplicate = users.some((u) => u.username === newUser.username);

        if (isDuplicate) {
            alert("Username already exists. Please choose another.");
        } else {
            users.push(newUser);
            alert("Account created successfully!");
            hidePopup("create-account-popup");
        }
    } else {
        alert("Please fill all fields.");
    }
});
