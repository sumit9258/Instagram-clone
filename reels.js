// Function to convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

// Initialize with some sample videos
let videos = [
    { 
        type: 'video', 
        src: 'asset/Ringing in the New Year with laughter, joy, and unforgettable memories at Skillyards! 🎉✨ - SkillYards (720p, h264).mp4',
        comments: [
            { user: "thakurmahawserangh", text: "rawat", likes: 3, time: "77" },
            { user: "durgeshsain9431", text: "", likes: 7395, time: "5w" }
        ]
    },
    { 
        type: 'video', 
        src: 'asset/🎉 Happy Birthday, Pratik Sir! Wishing you a day filled with joy and laughter. - SkillYards (720p, h264).mp4',
        comments: [
            { user: "user1", text: "Happy birthday!", likes: 12, time: "2d" },
            { user: "user2", text: "Looking great!", likes: 5, time: "1d" }
        ]
    }
];

// Load videos from localStorage or initialize with sample videos
if (localStorage.getItem('reels')) {
    videos = JSON.parse(localStorage.getItem('reels'));
} else {
    localStorage.setItem('reels', JSON.stringify(videos));
}

const reelsContainer = document.getElementById('reelsContainer');
const likedReels = JSON.parse(localStorage.getItem('likedReels')) || {};
let likeCounts = JSON.parse(localStorage.getItem('likeCounts')) || Array(videos.length).fill(0);
let currentReelIndex = 0;

// Ensure all reels have a like count (default 0)
if (likeCounts.length !== videos.length) {
    likeCounts = Array(videos.length).fill(0);
}

// Render all reels
function renderReels() {
    reelsContainer.innerHTML = '';
    videos.forEach((reel, index) => {
        const reelDiv = document.createElement('div');
        reelDiv.className = 'relative h-full flex items-center justify-center snap-center';

        // Calculate total comments count
        const commentsCount = reel.comments ? reel.comments.length : 0;

        // Reel HTML
        reelDiv.innerHTML = `
            <video id="video-${index}" class="reel w-full h-full object-cover rounded-lg">
                <source src="${reel.src}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <button onclick="togglePlayPause(${index})" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 hover:opacity-100 transition-opacity">
                <i class="fas fa-pause text-4xl text-white"></i>
            </button>
            <div class="absolute right-4 flex flex-col space-y-4 items-center text-white">
                <div class="action-item">
                    <i id="like-${index}" onclick="toggleLike(${index})" class="fas fa-heart text-2xl cursor-pointer ${likedReels[index] ? 'text-red-500' : 'text-white'}"></i>
                    <span id="like-count-${index}" class="action-count">${likeCounts[index]}</span>
                </div>
                <div class="action-item">
                    <i onclick="openComments(${index})" class="fas fa-comment text-2xl cursor-pointer"></i>
                    <span id="comment-count-${index}" class="action-count">${commentsCount}</span>
                </div>
                <i class="fas fa-share text-2xl cursor-pointer"></i>
            </div>
        `;
        reelsContainer.appendChild(reelDiv);
    });
}

// Initial render
renderReels();

// Play/Pause toggle
function togglePlayPause(index) {
    const video = document.getElementById(`video-${index}`);
    video.paused ? video.play() : video.pause();
}

// Like toggle with 0 and 1 behavior
function toggleLike(index) {
    const likeIcon = document.getElementById(`like-${index}`);
    const likeCount = document.getElementById(`like-count-${index}`);

    if (likedReels[index]) {
        // Unlike the reel
        likedReels[index] = false;
        likeCounts[index] = 0;
        likeIcon.classList.remove('text-red-500');
        likeIcon.classList.add('text-white');
    } else {
        // Like the reel
        likedReels[index] = true;
        likeCounts[index] = 1;
        likeIcon.classList.add('text-red-500');
        likeIcon.classList.remove('text-white');
    }

    // Update localStorage
    localStorage.setItem('likedReels', JSON.stringify(likedReels));
    localStorage.setItem('likeCounts', JSON.stringify(likeCounts));

    // Update UI
    likeCount.textContent = likeCounts[index];
}

// Open comments section
function openComments(index) {
    currentReelIndex = index;
    const commentSection = document.getElementById('commentSection');
    const backdrop = document.getElementById('commentBackdrop');
    const commentsList = document.getElementById('commentsList');
    
    // Load comments for this reel
    commentsList.innerHTML = '';
    const reel = videos[index];
    if (reel.comments && reel.comments.length > 0) {
        reel.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'bg-gray-800 p-3 rounded-lg';
            commentElement.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-semibold">${comment.user}</p>
                        <p>${comment.text}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="far fa-heart text-sm"></i>
                        <span class="text-xs">${comment.likes}</span>
                    </div>
                </div>
                <p class="text-xs text-gray-400 mt-1">${comment.time}</p>
            `;
            commentsList.appendChild(commentElement);
        });
    } else {
        commentsList.innerHTML = '<p class="text-center text-gray-400">No comments yet</p>';
    }
    
    // Show comment section
    commentSection.classList.add('active');
    backdrop.classList.add('active');
}

// Close comments section
document.getElementById('closeComments').addEventListener('click', () => {
    document.getElementById('commentSection').classList.remove('active');
    document.getElementById('commentBackdrop').classList.remove('active');
});

// Post a new comment
document.getElementById('postComment').addEventListener('click', () => {
    const commentInput = document.getElementById('commentInput');
    const commentText = commentInput.value.trim();
    
    if (commentText) {
        // Add comment to the reel data
        if (!videos[currentReelIndex].comments) {
            videos[currentReelIndex].comments = [];
        }
        
        const newComment = {
            user: "current_user",
            text: commentText,
            likes: 0,
            time: "Just now"
        };
        
        videos[currentReelIndex].comments.push(newComment);
        
        // Update localStorage
        localStorage.setItem('reels', JSON.stringify(videos));
        
        // Refresh comments display
        openComments(currentReelIndex);
        
        // Update comment count on the reel
        updateCommentCount(currentReelIndex);
        
        // Clear input
        commentInput.value = '';
    }
});

// Update comment count display
function updateCommentCount(index) {
    const reel = videos[index];
    const commentsCount = reel.comments ? reel.comments.length : 0;
    const commentCountElement = document.getElementById(`comment-count-${index}`);
    
    if (commentCountElement) {
        commentCountElement.textContent = commentsCount;
    }
}

// Upload functionality
function openUpload() {
    document.getElementById('uploadSection').classList.add('active');
    document.getElementById('uploadBackdrop').classList.add('active');
}

document.getElementById('closeUpload').addEventListener('click', closeUpload);
document.getElementById('uploadBackdrop').addEventListener('click', closeUpload);

function closeUpload() {
    document.getElementById('uploadSection').classList.remove('active');
    document.getElementById('uploadBackdrop').classList.remove('active');
    resetUploadForm();
}

function resetUploadForm() {
    document.getElementById('videoPreview').classList.add('hidden');
    document.getElementById('uploadContainer').classList.remove('hidden');
    document.getElementById('captionInput').value = '';
    document.getElementById('uploadButton').disabled = true;
    document.getElementById('videoUpload').value = '';
}

// Handle file selection
document.getElementById('uploadContainer').addEventListener('click', () => {
    document.getElementById('videoUpload').click();
});

document.getElementById('videoUpload').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (file) {
        const videoPreview = document.getElementById('videoPreview');
        const videoURL = URL.createObjectURL(file);
        
        videoPreview.src = videoURL;
        videoPreview.classList.remove('hidden');
        document.getElementById('uploadContainer').classList.add('hidden');
        document.getElementById('uploadButton').disabled = false;
    }
});

// Handle reel upload
document.getElementById('uploadButton').addEventListener('click', async function() {
    const caption = document.getElementById('captionInput').value.trim();
    const videoFile = document.getElementById('videoUpload').files[0];
    
    if (videoFile) {
        // Convert video to base64 for storage
        const videoBase64 = await fileToBase64(videoFile);
        
        // Add the new reel to our array
        const newReel = {
            type: 'video',
            src: videoBase64, // Store as base64
            caption: caption,
            comments: []
        };
        
        videos.unshift(newReel); // Add to beginning of array
        likeCounts.unshift(0); // Add new like count
        
        // Update localStorage
        localStorage.setItem('reels', JSON.stringify(videos));
        localStorage.setItem('likeCounts', JSON.stringify(likeCounts));
        
        // Re-render reels
        renderReels();
        
        // Close upload form
        closeUpload();
        
        // Scroll to top to show the new reel
        reelsContainer.scrollTo(0, 0);
    }
});

// Also post comment when pressing Enter
document.getElementById('commentInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('postComment').click();
    }
});


// Automatic play/pause on scroll with more scroll required to switch
function checkReels() {
    const reels = document.querySelectorAll('.reel');
    const threshold = 0.6; // Scroll more before switching
    reels.forEach(reel => {
        const rect = reel.getBoundingClientRect();
        const inView = rect.top >= 0 && rect.bottom <= window.innerHeight * (1 + threshold);
        if (reel.tagName === 'VIDEO') {
            inView ? reel.play() : reel.pause();
        }
    });
}

reelsContainer.addEventListener('scroll', checkReels);
window.addEventListener('load', checkReels);