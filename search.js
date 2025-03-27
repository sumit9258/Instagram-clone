// Initialize sample users for search functionality
function initializeUsers() {
    if (!localStorage.getItem('users')) {
        const users = [
            {
                id: 1,
                username: 'sumit_sikarwar_love',
                name: 'Sumit Sikarwar',
                image: 'https://randomuser.me/api/portraits/men/1.jpg',
                bio: 'Love to travel and explore',
                isFollowing: true,
                followers: 1200,
                following: 340,
                posts: [
                    {postImage: 'https://picsum.photos/id/10/500/500'},
                    {postImage: 'https://picsum.photos/id/11/500/500'},
                    {postImage: 'https://picsum.photos/id/12/500/500'}
                ]
            },
            {
                id: 2,
                username: 'thakur_aman_jadon_302',
                name: 'Aman Singh Jadon',
                image: 'https://randomuser.me/api/portraits/men/2.jpg',
                bio: 'Photography enthusiast',
                isFollowing: true,
                followers: 850,
                following: 120,
                posts: [
                    {postImage: 'https://picsum.photos/id/20/500/500'},
                    {postImage: 'https://picsum.photos/id/21/500/500'}
                ]
            },
            {
                id: 3,
                username: 'gareebpanda',
                name: 'Virat Raghav',
                image: 'https://randomuser.me/api/portraits/men/3.jpg',
                bio: '311K followers',
                isFollowing: false,
                followers: 311000,
                following: 42,
                posts: [
                    {postImage: 'https://picsum.photos/id/30/500/500'},
                    {postImage: 'https://picsum.photos/id/31/500/500'},
                    {postImage: 'https://picsum.photos/id/32/500/500'},
                    {postImage: 'https://picsum.photos/id/33/500/500'},
                    {postImage: 'https://picsum.photos/id/34/500/500'}
                ]
            },
            {
                id: 4,
                username: 'nishu_deshwal_jaat',
                name: 'Nishu Deshwal',
                image: 'https://randomuser.me/api/portraits/women/1.jpg',
                bio: 'Fitness trainer',
                isFollowing: false,
                followers: 4500,
                following: 210,
                posts: []
            },
            {
                id: 5,
                username: 'skillyards',
                name: 'Skillyards',
                image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
                bio: 'Learning and growing',
                isFollowing: false,
                followers: 10000,
                following: 150,
                posts: [
                    {postImage: 'https://picsum.photos/id/50/500/500'}
                ]
            }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
}

// Toggle search sidebar visibility
function toggleSearch() {
    const mainSidebar = document.querySelector('.w-1\\/4.bg-white');
    const searchSidebar = document.getElementById('searchSidebar');
    
    if (searchSidebar.classList.contains('hidden')) {
        mainSidebar.classList.add('hidden');
        searchSidebar.classList.remove('hidden');
        document.getElementById('searchInput').focus();
        searchUsers(); // Load initial search results
    } else {
        searchSidebar.classList.add('hidden');
        mainSidebar.classList.remove('hidden');
    }
}

// Search users based on input
function searchUsers() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    searchResults.innerHTML = '';
    
    // Create header for recent searches
    const recentHeader = document.createElement('div');
    recentHeader.classList.add('flex', 'justify-between', 'items-center', 'px-2', 'py-3');
    recentHeader.innerHTML = `
        <span class="font-semibold">Recent</span>
        <button class="text-blue-500 text-sm font-semibold" onclick="clearRecentSearches()">Clear all</button>
    `;
    searchResults.appendChild(recentHeader);
    
    if (searchTerm.trim() === '') {
        // Show recent searches (first 5 users)
        users.slice(0, 5).forEach(user => {
            addUserToSearchResults(user, searchResults);
        });
        return;
    }
    
    const filteredUsers = users.filter(user => 
        user.id.toString() === searchTerm || // Search by ID
        user.username.toLowerCase().includes(searchTerm) || 
        user.name.toLowerCase().includes(searchTerm)
    );
    
    if (filteredUsers.length === 0) {
        searchResults.innerHTML = '<p class="text-gray-500 text-center py-4">No users found</p>';
    } else {
        filteredUsers.forEach(user => {
            addUserToSearchResults(user, searchResults);
        });
    }
}

// Add user to search results container
function addUserToSearchResults(user, container) {
    const userDiv = document.createElement('div');
    userDiv.classList.add('flex', 'items-center', 'p-2', 'rounded-lg', 'hover:bg-gray-100', 'cursor-pointer');
    userDiv.onclick = () => openProfile(user);
    
    userDiv.innerHTML = `
        <img src="${user.image}" alt="${user.name}" class="w-10 h-10 rounded-full object-cover mr-3">
        <div class="flex-1">
            <p class="font-semibold">${user.username}</p>
            <p class="text-gray-600 text-sm">
                ${user.name} • ${user.posts ? user.posts.length : 0} posts • ${user.followers >= 1000 ? `${(user.followers/1000).toFixed(0)}K` : user.followers} followers
            </p>
        </div>
        ${user.isFollowing ? '<i class="fas fa-check-circle text-blue-500"></i>' : ''}
    `;
    
    container.appendChild(userDiv);
}

// Clear recent searches
function clearRecentSearches() {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '<p class="text-gray-500 text-center py-4">No recent searches</p>';
}

// Open user profile (needs to be connected to your profile modal)
function openProfile(user) {
    // This should be connected to your profile modal functionality
    console.log("Opening profile for:", user.username);
    // You'll need to implement this based on your profile modal
}

// Initialize users when the script loads
document.addEventListener('DOMContentLoaded', initializeUsers);