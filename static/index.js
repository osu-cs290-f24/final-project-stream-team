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
    event.preventDefault();

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
        fetch('/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to save user.");
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
                // hidePopup("create-account-popup");
                window.location.href = "/videos"
            })
            .catch(err => {
                console.error(err);
                alert("Error: Username may already exist or server error occurred.");
            });
    } else {
        alert("Please fill all fields.");
    }
});

// Fetch user data on page load
function loadUsers() {
    fetch('/users-data')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            users = data;
            console.log("Users loaded:", users);
        })
        .catch(err => {
            console.error("Failed to load users:", err);
        });
}


// Call loadUsers on page load
window.addEventListener("load", loadUsers);

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