// Story Modal functionality
function openStory(storyId) {
    const storyModal = document.getElementById('storyModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalImage = document.getElementById('modalImage');
    const storyUser = document.getElementById('storyUser');

    const storyElement = document.getElementById(storyId);
    if (storyElement.tagName === 'VIDEO') {
        modalVideo.src = storyElement.querySelector('source').src;
        modalVideo.style.display = 'block';
        modalImage.style.display = 'none';
        modalVideo.play();
    } else {
        modalImage.src = storyElement.src;
        modalImage.style.display = 'block';
        modalVideo.style.display = 'none';
    }

    storyUser.textContent = storyId.replace('story', 'Friend ');
    storyModal.classList.remove('hidden');
}

function closeStory() {
    const storyModal = document.getElementById('storyModal');
    const modalVideo = document.getElementById('modalVideo');
    const modalImage = document.getElementById('modalImage');

    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.style.display = 'none';
    modalImage.style.display = 'none';
    storyModal.classList.add('hidden');
}