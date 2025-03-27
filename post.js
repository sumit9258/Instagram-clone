// Comments Script for Instagram UI Clone

// Function to render existing comments
function renderExistingComments(post) {
    // Check if the post has comments stored
    const storedComments = post.storedComments || [];
    
    if (storedComments.length === 0) {
        return `<p class="text-center text-gray-500">No comments yet</p>`;
    }
    
    return storedComments.map((comment, index) => `
        <div class="flex items-start mb-4 relative group">
            <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" 
                alt="User" 
                class="w-8 h-8 rounded-full mr-3 object-cover"
            >
            <div class="flex-1">
                <p class="font-semibold">${comment.username}</p>
                <p class="text-gray-700">${comment.text}</p>
                <p class="text-xs text-gray-500">${comment.timestamp}</p>
            </div>
            <button 
                onclick="deleteComment('${post.postImage}', ${index})" 
                class="absolute top-0 right-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            >
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `).join('');
}

// Function to add a comment modal to a post
function addCommentModal(post, postDiv) {
    // Create comment modal container
    const commentModal = document.createElement('div');
    commentModal.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'flex', 'items-center', 'justify-center', 'z-50');
    
    commentModal.innerHTML = `
        <div class="bg-white rounded-lg w-full max-w-md">
            <div class="p-4 border-b border-gray-300 flex justify-between items-center">
                <h2 class="text-xl font-semibold">Comments</h2>
                <button onclick="closeCommentModal(this)" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            
            <div id="existingCommentsContainer" class="p-4 max-h-64 overflow-y-auto">
                ${renderExistingComments(post)}
            </div>
            
            <div class="p-4 border-t border-gray-300 flex items-center">
                <input 
                    type="text" 
                    id="commentInput" 
                    placeholder="Add a comment..." 
                    class="flex-1 p-2 border rounded-l-lg"
                >
                <button 
                    onclick="submitComment(this, '${post.postImage}')" 
                    class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
                >
                    Post
                </button>
            </div>
        </div>
    `;

    // Append modal to body
    document.body.appendChild(commentModal);
}

// Function to close comment modal
function closeCommentModal(closeButton) {
    const modal = closeButton.closest('.fixed');
    modal.remove();
}

// Function to submit a comment
function submitComment(postButton, postImageKey) {
    const commentInput = postButton.previousElementSibling;
    const commentText = commentInput.value.trim();
    
    if (commentText === '') return;

    // Get existing posts from localStorage
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    // Find the specific post
    const postIndex = posts.findIndex(post => post.postImage === postImageKey);
    
    if (postIndex !== -1) {
        // Create comment object
        const newComment = {
            username: localStorage.getItem("username") || "You",
            text: commentText,
            timestamp: new Date().toLocaleString()
        };

        // Initialize storedComments if not exists
        if (!posts[postIndex].storedComments) {
            posts[postIndex].storedComments = [];
        }

        // Add comment to post
        posts[postIndex].storedComments.push(newComment);
        
        // Update comments text in the main post
        posts[postIndex].comments = `${posts[postIndex].storedComments.length} comments`;

        // Save updated posts back to localStorage
        localStorage.setItem("posts", JSON.stringify(posts));

        // Update UI
        const existingCommentsContainer = document.getElementById('existingCommentsContainer');
        existingCommentsContainer.innerHTML = renderExistingComments(posts[postIndex]);
        
        // Update comments count in the main post view
        const postsContainer = document.getElementById("postsContainer");
        const postElements = postsContainer.querySelectorAll('.comments-count');
        postElements.forEach((element, index) => {
            if (index === postIndex) {
                element.textContent = `${posts[postIndex].storedComments.length} comments`;
            }
        });
        
        // Clear input
        commentInput.value = '';
    }
}

// Function to delete a comment
function deleteComment(postImageKey, commentIndex) {
    // Get existing posts from localStorage
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    
    // Find the specific post
    const postIndex = posts.findIndex(post => post.postImage === postImageKey);
    
    if (postIndex !== -1 && posts[postIndex].storedComments) {
        // Remove the comment at the specified index
        posts[postIndex].storedComments.splice(commentIndex, 1);
        
        // Update comments text in the main post
        posts[postIndex].comments = posts[postIndex].storedComments.length > 0 
            ? `${posts[postIndex].storedComments.length} comments`
            : "Be the first to comment";

        // Save updated posts back to localStorage
        localStorage.setItem("posts", JSON.stringify(posts));

        // Update comments in the modal
        const existingCommentsContainer = document.getElementById('existingCommentsContainer');
        existingCommentsContainer.innerHTML = renderExistingComments(posts[postIndex]);
        
        // Update comments count in the main post view
        const postsContainer = document.getElementById("postsContainer");
        const postElements = postsContainer.querySelectorAll('.comments-count');
        postElements.forEach((element, index) => {
            if (index === postIndex) {
                element.textContent = posts[postIndex].comments;
            }
        });
    }
}

// Modify addPostToUI function to add comment modal trigger
function enhancePostWithComments(post, newPostDiv) {
    // Find comment button
    const commentButton = newPostDiv.querySelector('.fa-comment');
    
    commentButton.addEventListener('click', () => {
        addCommentModal(post, newPostDiv);
    });
}

// Modify the existing loadStoredPosts to use new comment enhancement
function loadStoredPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // Existing default posts loading logic...
    const defaultPosts = [
        // ... (keep your existing default posts)
    ];

    // Existing post adding logic remains the same
    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";
    
    posts.forEach(post => {
        // Update comments count before adding post
        post.comments = post.storedComments && post.storedComments.length > 0 
            ? `${post.storedComments.length} comments` 
            : "Be the first to comment";

        const postDiv = addPostToUI(post);
        enhancePostWithComments(post, postDiv);
    });
}

// Modify addPostToUI to include comments count
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
        <p class="px-4 text-sm text-gray-400 comments-count">${post.comments}</p>
    `;

    // Existing event listeners...
    const postImage = newPostDiv.querySelector('img[alt="Uploaded Post"]');
    postImage.addEventListener('dblclick', () => handleDoubleClick(post, newPostDiv));

    const likeButton = newPostDiv.querySelector('.fa-heart');
    likeButton.addEventListener('click', () => handleLikeClick(post, newPostDiv));

    postsContainer.prepend(newPostDiv);
    
    return newPostDiv;
}

// Ensure compatibility with existing code
document.addEventListener("DOMContentLoaded", loadStoredPosts);


function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const posts = JSON.parse(localStorage.getItem("posts")) || [];
        
        const newPost = {
            user: localStorage.getItem("username") || "You",
            userImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg", // Default user image
            postImage: e.target.result,
            likes: 0,
            comments: "Be the first to comment",
            storedComments: []
        };

        posts.push(newPost);
        localStorage.setItem("posts", JSON.stringify(posts));

        const newPostDiv = addPostToUI(newPost);
        enhancePostWithComments(newPost, newPostDiv);
    };
    reader.readAsDataURL(file);
}
