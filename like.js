// === Post Like Handling JS ===
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

function updatePostInLocalStorage(updatedPost) {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    const index = posts.findIndex(post => post.postImage === updatedPost.postImage);
    if (index !== -1) {
        posts[index] = updatedPost;
        localStorage.setItem("posts", JSON.stringify(posts));
    }
}
