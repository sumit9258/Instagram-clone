document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 
    
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    
    let storedUsername = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");
    

    if (storedUsername && storedPassword) {
        // Agar pehle se credentials stored hain, toh match karein
        if (username === storedUsername && password === storedPassword) {
            alert("Login Successful!");
            window.location.href = "dashboard.html"; // Redirect after login
        } else {
            alert("Invalid Credentials! Please try again.");
        }
    } else {
        // Agar pehli baar login ho raha hai, toh credentials store karein
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        alert("Account Created & Login Successful!");
        window.location.href = "dashboard.html";
    }
});
