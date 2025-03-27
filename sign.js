document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    // Get existing users or initialize empty array
    let users = JSON.parse(localStorage.getItem("users")) || [];
    
    // Check if user exists
    const existingUser = users.find(user => 
        user.username === username && user.password === password
    );
    
    if (existingUser) {
        // User exists and credentials match
        alert("Login Successful!");
        window.location.href = "index.html";
    } else {
        // Check if username exists but password is wrong
        const usernameExists = users.some(user => user.username === username);
        
        if (usernameExists) {
            alert("Invalid Password! Please try again.");
        } else {
            // New user - add to storage
            users.push({ username, password });
            localStorage.setItem("users", JSON.stringify(users));
            alert("Account Created & Login Successful!");
            window.location.href = "dashboard.html";
        }
    }
});
