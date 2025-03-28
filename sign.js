document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    // Get existing users or initialize empty array
    const users = JSON.parse(localStorage.getItem("instagram_users")) || [];
    
    // Check if user exists
    const existingUser = users.find(user => user.username === username);
    
    if (existingUser) {
        // User exists - verify password
        if (existingUser.password === password) {
            // Successful login
            localStorage.setItem("current_user", JSON.stringify(existingUser));
            alert("Login successful!");
            window.location.href = "home.html"; // Redirect to home page
        } else {
            alert("Incorrect password! Please try again.");
        }
    } else {
        // New user - create account
        if (username && password) {
            const newUser = {
                username,
                password,
                createdAt: new Date().toISOString()
            };
            
            users.push(newUser);
            localStorage.setItem("instagram_users", JSON.stringify(users));
            localStorage.setItem("current_user", JSON.stringify(newUser));
            
            alert("Account created successfully! You are now logged in.");
            window.location.href = "home.html"; // Redirect to home page
        } else {
            alert("Please enter both username and password.");
        }
    }
});