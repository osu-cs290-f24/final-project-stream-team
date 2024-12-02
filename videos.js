let videos = [];

// Render videos dynamically
function renderVideos(videoList) {
    const container = document.getElementById("video-container");
    container.innerHTML = "";

    videoList.forEach(video => {
        const videoPost = document.createElement("div");
        videoPost.className = "video-post";

        videoPost.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}">
            <h3>${video.title}</h3>
            <p>By: ${video.poster}</p>
            <p>Length: ${video.length} minutes</p>
        `;

        container.appendChild(videoPost);
    });
}

// Search videos by title or author
document.getElementById("search-btn").addEventListener("click", function () {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(query) || video.poster.toLowerCase().includes(query)
    );
    renderVideos(filteredVideos);
});

// Logout button to return to index.html
document.getElementById("logout-btn").addEventListener("click", function () {
    window.location.href = "index.html";
});


function showPopup(popupId) {
    document.getElementById(popupId).hidden = false;
}

function hidePopup(popupId) {
    document.getElementById(popupId).hidden = true;
}

// Show the "Post Video" popup
document.getElementById("post-video-open-btn").addEventListener("click", function () {
    showPopup("post-video-popup");
});

// Close the "Post Video" popup
document.getElementById("close-post-video-btn").addEventListener("click", function () {
    hidePopup("post-video-popup");
});

// Post a new video
function postVideo() {
    // Get input values
    const title = document.getElementById("video-title").value.trim();
    const poster = document.getElementById("video-poster").value.trim();
    const thumbnail = document.getElementById("video-thumbnail").value.trim();
    const length = parseFloat(document.getElementById("video-length").value);

    // Validate inputs
    if (!title || !poster || !thumbnail || isNaN(length)) {
        alert("Please fill in all fields with valid values.");
        return;
    }

    // Create new video object
    const newVideo = {
        title,
        poster,
        thumbnail,
        length: length.toFixed(2), // Ensure consistent format for length
    };

    // Add new video to the array
    videos.push(newVideo);

    // Re-render videos
    renderVideos(videos);

    // Clear form fields
    document.getElementById("video-title").value = "";
    document.getElementById("video-poster").value = "";
    document.getElementById("video-thumbnail").value = "";
    document.getElementById("video-length").value = "";

    alert("Video posted successfully!");

    // Close the popup
    hidePopup("post-video-popup");
}

// Attach event listener to the "Post Video" button in the popup
document.getElementById("post-video-btn").addEventListener("click", postVideo);