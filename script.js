// Expanded media data with more images
const mediaData = [
    { type: 'image', url: 'https://picsum.photos/600/600?random=1' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=2' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=3' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=4' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=5' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=6' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=7' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=8' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=9' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=10' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=11' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=12' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=13' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=14' },
    { type: 'image', url: 'https://picsum.photos/600/600?random=15' },
    { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnail: 'https://picsum.photos/600/600?random=16' },
    { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', thumbnail: 'https://picsum.photos/600/600?random=17' },
    { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnail: 'https://picsum.photos/600/600?random=18' },
    { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', thumbnail: 'https://picsum.photos/600/600?random=19' },
    { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', thumbnail: 'https://picsum.photos/600/600?random=20' }
];

// Initialize the explore grid
function initExploreGrid() {
    const exploreGrid = document.getElementById('exploreGrid');
    
    mediaData.forEach((media, index) => {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow';
        mediaItem.onclick = () => openMediaModal(media);
        
        if (media.type === 'image') {
            mediaItem.innerHTML = `
                <img src="${media.url}" loading="lazy" alt="Post ${index + 1}" class="w-full aspect-square object-cover">
            `;
        } else {
            mediaItem.innerHTML = `
                <div class="relative w-full aspect-square">
                    <img src="${media.thumbnail}" loading="lazy" alt="Video thumbnail" class="w-full h-full object-cover">
                    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                        <div class="bg-white bg-opacity-80 rounded-full p-3">
                            <i class="fas fa-play text-black text-xl"></i>
                        </div>
                    </div>
                </div>
            `;
        }
        
        exploreGrid.appendChild(mediaItem);
    });
}

// Open media modal
function openMediaModal(media) {
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    
    if (media.type === 'image') {
        modalImage.src = media.url;
        modalImage.classList.remove('hidden');
        modalVideo.classList.add('hidden');
        modalVideo.pause();
    } else {
        modalVideo.src = media.url;
        modalVideo.controls = true;
        modalVideo.muted = true;
        modalVideo.classList.remove('hidden');
        modalImage.classList.add('hidden');
        
        const playPromise = modalVideo.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                modalVideo.controls = true;
            });
        }
    }
    
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// Close media modal
function closeMediaModal() {
    const modal = document.getElementById('mediaModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modal.classList.add('hidden');
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
    }
    document.body.style.overflow = '';
}

// Upload media function
function uploadImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const exploreGrid = document.getElementById('exploreGrid');
    const mediaItem = document.createElement('div');
    mediaItem.className = 'relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow';
    
    const fileURL = URL.createObjectURL(file);
    const isImage = file.type.startsWith('image/');
    
    if (isImage) {
        mediaItem.innerHTML = `
            <img src="${fileURL}" class="w-full aspect-square object-cover" alt="Uploaded image">
        `;
    } else {
        mediaItem.innerHTML = `
            <div class="relative w-full aspect-square">
                <video class="w-full h-full object-cover" muted loop>
                    <source src="${fileURL}" type="${file.type}">
                </video>
                <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div class="bg-white bg-opacity-80 rounded-full p-3">
                        <i class="fas fa-play text-black text-xl"></i>
                    </div>
                </div>
            </div>
        `;
    }
    
    mediaItem.onclick = () => openMediaModal({
        type: isImage ? 'image' : 'video',
        url: fileURL,
        thumbnail: isImage ? null : 'https://picsum.photos/600/600?random=99'
    });
    
    exploreGrid.insertBefore(mediaItem, exploreGrid.firstChild);
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    initExploreGrid();
    
    document.getElementById('modalCloseBtn').addEventListener('click', closeMediaModal);
    
    document.getElementById('mediaModal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('mediaModal')) {
            closeMediaModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !document.getElementById('mediaModal').classList.contains('hidden')) {
            closeMediaModal();
        }
    });
});