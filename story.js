document.addEventListener("DOMContentLoaded", loadStories);

function loadStories() {
    let friends = JSON.parse(localStorage.getItem("friends")) || [];

    // Initialize with default data if empty
    if (friends.length === 0) {
        friends = [
            {
                name: "Your story",
                image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
                uploadedVideo: null,
                uploadedImage: null,
                song: null,
                timestamp: null
            },
            {
                name: "Friend 2",
                image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
                video: "asset/SampleVideo_1280x720_1mb.mp4",
                uploadedVideo: null,
                uploadedImage: null,
                song: null,
                timestamp: null
            },
            {
                name: "Friend 3",
                image: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
                video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                uploadedVideo: null,
                uploadedImage: null,
                song: null,
                timestamp: null
            },
            {
                name: "Friend 4",
                image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
                video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                uploadedVideo: null,
                uploadedImage: null,
                song: null,
                timestamp: null
            },
            {
                name: "Friend 5",
                image: "https://images.pexels.com/photos/61120/pexels-photo-61120.jpeg",
                video: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
                uploadedVideo: null,
                uploadedImage: null,
                song: null,
                timestamp: null
            }
        ];
    }

    // Filter out expired stories (only for uploaded content)
    const now = new Date();
    friends = friends.map(friend => {
        if (friend.timestamp) {
            const storyDate = new Date(friend.timestamp);
            const ageInHours = (now - storyDate) / (1000 * 60 * 60);

            if ((friend.uploadedImage || friend.uploadedVideo) && ageInHours > 24) {
                return {
                    ...friend,
                    uploadedImage: null,
                    uploadedVideo: null,
                    song: null,
                    timestamp: null
                };
            }
        }
        return friend;
    });

    localStorage.setItem("friends", JSON.stringify(friends));
    displayStories(friends);
}

function displayStories(friends) {
    const storiesContainer = document.getElementById("storiesContainer");
    storiesContainer.innerHTML = '';

    friends.forEach((friend, index) => {
        const storyDiv = document.createElement("div");
        storyDiv.classList.add("relative", "flex", "flex-col", "items-center", "cursor-pointer", "mb-2");

        const displayImage = friend.image;
        const hasContent = friend.uploadedImage || friend.uploadedVideo || friend.video;

        storyDiv.innerHTML = `
            <div class="story-container relative">
                <img src="${displayImage}" alt="Story" class="w-16 h-16 rounded-full border-2 ${hasContent ? 'border-pink-500' : 'border-gray-300'} object-cover"
                     onclick="openStory(${index})">
                ${index === 0 ? `
                    <div class="absolute bottom-0 right-0">
                        <i class="fas fa-plus-circle text-2xl text-pink-500" onclick="event.stopPropagation(); openStoryUploadModal()"></i>
                    </div>
                ` : ''}
                <p class="text-xs mt-1 text-center">${friend.name}</p>
            </div>
        `;

        storiesContainer.appendChild(storyDiv);
    });
}

function openStory(storyIndex) {
    const friends = JSON.parse(localStorage.getItem("friends")) || [];
    const story = friends[storyIndex];

    if (storyIndex === 0 && !story.uploadedImage && !story.uploadedVideo) {
        alert("You haven't uploaded any story yet. Click the + icon to add one.");
        return;
    }

    const mediaSource = story.uploadedVideo || story.uploadedImage || story.video;
    const isVideo = !!(story.uploadedVideo || story.video);

    console.log("Story Index:", storyIndex);
    console.log("Story Data:", story);
    console.log("Media Source:", mediaSource);
    console.log("Is Video:", isVideo);

    if (!mediaSource) {
        alert("No media found for this story.");
        return;
    }

    const storyViewModal = document.getElementById('storyViewModal');
    storyViewModal.innerHTML = `
        <div class="relative w-full h-full flex items-center justify-center bg-black">
            ${isVideo ? `
                <video src="${mediaSource}" class="max-w-full max-h-full object-contain" controls autoplay playsinline></video>
            ` : `
                <img src="${mediaSource}" class="max-w-full max-h-full object-contain">
            `}

            ${story.song ? `
                <audio src="${story.song}" autoplay loop class="hidden"></audio>
                <div class="absolute bottom-16 left-4 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full">
                    <i class="fas fa-music mr-2"></i>
                    <span>${document.getElementById('songSelect')?.options[document.getElementById('songSelect').selectedIndex]?.text || 'Music'}</span>
                </div>
            ` : ''}

            ${storyIndex === 0 && (story.uploadedImage || story.uploadedVideo) ? `
                <button onclick="deleteStory(${storyIndex})" class="absolute top-4 left-4 bg-red-500 text-white rounded-full p-2 z-50">
                    <i class="fas fa-trash"></i>
                </button>
            ` : ''}

            <button onclick="closeStoryViewer()" class="absolute top-4 right-4 text-white text-3xl z-50">×</button>

            <div class="absolute bottom-4 left-4 text-white bg-black bg-opacity-50 px-4 py-2 rounded-full flex items-center">
                <img src="${story.image}" class="w-8 h-8 rounded-full mr-2">
                <span>${story.name}</span>
            </div>
        </div>
    `;

    storyViewModal.classList.remove('hidden');

    // Auto-close when video ends
    const video = storyViewModal.querySelector('video');
    if (video) {
        video.addEventListener('ended', closeStoryViewer);
        // Ensure video plays
        video.play().catch(e => console.log("Video play failed:", e));
    }
}

function deleteStory(index) {
    if (confirm("Are you sure you want to delete this story?")) {
        const friends = JSON.parse(localStorage.getItem("friends")) || [];
        friends[index] = {
            ...friends[index],
            uploadedImage: null,
            uploadedVideo: null,
            song: null,
            timestamp: null
        };

        localStorage.setItem("friends", JSON.stringify(friends));
        closeStoryViewer();
        loadStories(); // Refresh the display
    }
}

function closeStoryViewer() {
    const storyViewModal = document.getElementById('storyViewModal');

    // Stop any playing audio
    const audioElement = storyViewModal.querySelector('audio');
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }

    // Stop any playing video
    const videoElement = storyViewModal.querySelector('video');
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
    }

    storyViewModal.classList.add('hidden');
    storyViewModal.innerHTML = '';
}

function openStoryUploadModal() {
    document.getElementById('storyUploadModal').classList.remove('hidden');
    document.getElementById('mediaInput').value = '';
    document.getElementById('mediaPreview').innerHTML = '';
    document.getElementById('songSelect').value = '';
    document.getElementById('songPreview').textContent = 'No song selected';
}

function closeStoryUploadModal() {
    document.getElementById('storyUploadModal').classList.add('hidden');
}

function previewMedia(event) {
    const preview = document.getElementById('mediaPreview');
    preview.innerHTML = '';

    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const fileType = file.type.split('/')[0];

        if (fileType === 'video') {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(file);
            video.controls = true;
            video.style.maxWidth = '100%';
            video.style.maxHeight = '200px';
            preview.appendChild(video);
        } else if (fileType === 'image') {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            img.style.maxWidth = '100%';
            img.style.maxHeight = '200px';
            preview.appendChild(img);
        }
    }
}

function updateSongPreview() {
    const songSelect = document.getElementById('songSelect');
    const preview = document.getElementById('songPreview');
    preview.textContent = songSelect.value ?
        songSelect.options[songSelect.selectedIndex].text :
        'No song selected';
}

function uploadStory() {
    const mediaInput = document.getElementById('mediaInput');
    const songSelect = document.getElementById('songSelect');

    if (!mediaInput.files || !mediaInput.files[0]) {
        alert('Please select a photo or video to upload');
        return;
    }

    const file = mediaInput.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const friends = JSON.parse(localStorage.getItem("friends")) || [];
        const yourStory = friends[0];

        if (file.type.includes('video')) {
            yourStory.uploadedVideo = e.target.result;
            yourStory.uploadedImage = null;
        } else if (file.type.includes('image')) {
            yourStory.uploadedImage = e.target.result;
            yourStory.uploadedVideo = null;
        }

        yourStory.song = songSelect.value || null;
        yourStory.timestamp = new Date().toISOString();

        friends[0] = yourStory;
        localStorage.setItem("friends", JSON.stringify(friends));

        closeStoryUploadModal();
        alert('Your story has been uploaded! It will disappear after 24 hours.');
        loadStories();
    };

    reader.readAsDataURL(file);
}