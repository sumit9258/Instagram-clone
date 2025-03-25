// ✅ Load posts from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadStoredPosts);

// Function to upload an image
function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const postImageURL = e.target.result;

            // Create a new post object
            const newPost = {
                user: "You",
                userImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
                postImage: postImageURL,
                likes: 0,
                comments: "Be the first to comment"
            };

            // Save the new post to localStorage
            savePostToLocalStorage(newPost);

            // Add the new post to the UI
            addPostToUI(newPost);
        };
        reader.readAsDataURL(file);
    }
}

// Function to save a post to localStorage
function savePostToLocalStorage(post) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));
}

// Function to load posts from localStorage
function loadStoredPosts() {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const postsContainer = document.getElementById("postsContainer");

    postsContainer.innerHTML = "";

    posts.forEach(post => {
        addPostToUI(post);
    });
}

// Function to add a post to the UI
function addPostToUI(post) {
    const postsContainer = document.getElementById("postsContainer");

    const newPostDiv = document.createElement("div");
    newPostDiv.classList.add("bg-white", "border", "border-gray-300", "rounded-lg", "mb-6");

    newPostDiv.innerHTML = `
        <div class="flex items-center p-4 border-b border-gray-300">
            <img src="${post.userImage}" alt="User" class="w-10 h-10 rounded-full object-cover mr-3">
            <p class="font-semibold">${post.user}</p>
        </div>
        <img src="${post.postImage}" alt="Uploaded Post" class="w-full object-cover cursor-pointer">
        <div class="flex space-x-4 p-4">
            <button class="text-2xl cursor-pointer transition-transform transform hover:scale-125"><i class="far fa-heart"></i></button>
            <button class="text-2xl cursor-pointer transition-transform transform hover:scale-125"><i class="far fa-comment"></i></button>
            <button class="text-2xl cursor-pointer transition-transform transform hover:scale-125"><i class="far fa-paper-plane"></i></button>
            <button class="text-2xl cursor-pointer transition-transform transform hover:scale-125 ml-auto"><i class="far fa-bookmark"></i></button>
        </div>
        <p class="px-4 text-sm font-semibold like-count">${post.likes} likes</p>
        <p class="px-4 text-sm text-gray-400">${post.comments}</p>
    `;

    // Add double-click event listener to the post image
    const postImage = newPostDiv.querySelector('img[alt="Uploaded Post"]');
    postImage.addEventListener('dblclick', () => handleDoubleClick(post, newPostDiv));

    // Add click event listener to the like button
    const likeButton = newPostDiv.querySelector('.fa-heart');
    likeButton.addEventListener('click', () => handleLikeClick(post, newPostDiv));

    postsContainer.prepend(newPostDiv);
}

// Function to handle like button click
function handleLikeClick(post, postDiv) {
    const likeButton = postDiv.querySelector('.fa-heart');
    const likeCountElement = postDiv.querySelector('.like-count');

    if (likeButton.classList.contains('far')) {
        likeButton.classList.remove('far');
        likeButton.classList.add('fas', 'text-red-500');
        post.likes += 1;
    } else {
        likeButton.classList.remove('fas', 'text-red-500');
        likeButton.classList.add('far');
        post.likes -= 1;
    }

    likeCountElement.textContent = `${post.likes} likes`;
    updatePostInLocalStorage(post);
}

// Function to handle double-click on post image
function handleDoubleClick(post, postDiv) {
    const likeButton = postDiv.querySelector('.fa-heart');
    const likeCountElement = postDiv.querySelector('.like-count');

    if (likeButton.classList.contains('far')) {
        likeButton.classList.remove('far');
        likeButton.classList.add('fas', 'text-red-500');
        post.likes += 1;
    }

    likeCountElement.textContent = `${post.likes} likes`;
    updatePostInLocalStorage(post);
}

// Function to update a post in localStorage
function updatePostInLocalStorage(updatedPost) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const index = posts.findIndex(post => post.postImage === updatedPost.postImage);
    if (index !== -1) {
        posts[index] = updatedPost;
        localStorage.setItem("posts", JSON.stringify(posts));
    }
}










function loadStoredPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Default posts hamesha add hone chahiye bina purane posts ko hataye
    const defaultPosts = [
        {
            user: "nature_wala",
            userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            postImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
            likes: 356,
            comments: "The beauty of nature is amazing! 🌿"
        },
        {
            user: "desi_foodie",
            userImage: "https://images.unsplash.com/photo-1554151228-14d9def656e4",
            postImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
            likes: 789,
            comments: "Had homemade food today! How does it look? 😋"
        },
        {
            user: "tech_india",
            userImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
            postImage: "https://images.unsplash.com/photo-1518770660439-4636190af475",
            likes: 432,
            comments: "Got a new smartphone! #TechLover"
        },
        {
            user: "bollywood_fan",
            userImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
            postImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
            likes: 1023,
            comments: "Watched a new movie today, it was amazing! 🎬"
        },
        {
            user: "travel_india",
            userImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
            postImage: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3",
            likes: 876,
            comments: "Visited the Taj Mahal, what a view! 😍"
        },
        {
            user: "fitness_baba",
            userImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
            postImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
            likes: 654,
            comments: "Daily exercise is a must! 💪"
        }
    ];

    // Har bar default posts add karte hain bina existing posts delete kiye
    defaultPosts.forEach(defaultPost => {
        if (!posts.some(post => post.postImage === defaultPost.postImage)) {
            posts.push(defaultPost);
        }
    });

    localStorage.setItem("posts", JSON.stringify(posts));

    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";  // Clear existing posts in UI
    posts.forEach(post => addPostToUI(post));
}
