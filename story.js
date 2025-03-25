// Load stories when the page loads
document.addEventListener("DOMContentLoaded", loadStories);

// Function to load stories
function loadStories() {
    const friendsData = [
        { name: "Your story", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
        { name: "Friend 2", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
        { name: "Friend 3", image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg" },
        { name: "Friend 4", image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg" },
        { name: "Friend 5", image: "https://images.pexels.com/photos/61120/pexels-photo-61120.jpeg" }
    ];

    // Save friends' data to localStorage
    localStorage.setItem("friends", JSON.stringify(friendsData));

    // Retrieve and display the friends' stories dynamically
    const friends = JSON.parse(localStorage.getItem("friends"));
    const storiesContainer = document.getElementById("storiesContainer");

    friends.forEach((friend, index) => {
        const storyDiv = document.createElement("div");
        storyDiv.classList.add("relative", "flex", "flex-col", "items-center", "cursor-pointer");
        storyDiv.innerHTML = `
            <video id="story${index}" class="w-16 h-16 rounded-full border-2 border-pink-500 object-cover" style="display:none;">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <img src="${friend.image}" alt="Story" class="w-16 h-16 rounded-full border-2 border-pink-500 object-cover" onclick="openStory('story${index}')">
        `;

        // Add Plus Icon beside the first story
        if (index === 0) {
            const plusIconDiv = document.createElement("div");
            plusIconDiv.classList.add("absolute", "right-0", "bottom-0", "mb-2", "mr-2", "text-pink-500", "cursor-pointer");
            plusIconDiv.innerHTML = `<i class="fas fa-plus-circle text-2xl"></i>`;
            storyDiv.appendChild(plusIconDiv);
        }

        storyDiv.innerHTML += `<p class="text-xs mt-1">${friend.name}</p>`;

        storiesContainer.appendChild(storyDiv);
    });
}
















































































































