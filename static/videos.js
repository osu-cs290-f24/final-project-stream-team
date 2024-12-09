let videos = [];

// Render videos dynamically
function renderVideos(videoList) {
    const container = document.getElementById("video-container");
    container.textContent = ""; // Clear the container securely

    videoList.forEach((video, index) => {
        // Calculates minutes and seconds
        const minutes = Math.floor(video.length);
        const seconds = Math.round((video.length - minutes) * 60).toString().padStart(2, "0");

        // Uses the Handlebars template to generate HTML for each video
        const videoHTML = Handlebars.templates.video({
            photoURL: video.thumbnail,
            alt: video.title,
            title: video.title,
            name: video.poster,
            minutes: minutes,
            seconds: seconds,
        });

        // Appends the generated HTML to the container
        container.insertAdjacentHTML("beforeend", videoHTML);
    });

    // Attach click event listeners to all video posts
    const videoPosts = document.querySelectorAll(".video-post");
    videoPosts.forEach((post, index) => {
        post.addEventListener("click", () => {
            // Redirect to the single video page with the corresponding index
            window.location.href = `/videos/${index}`;
        });
    });
}


// Format video length as MM:SS
function formatVideoLength(videoLength) {
    const minutes = Math.floor(videoLength);
    const seconds = Math.round((videoLength - minutes) * 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}


// Fetch videos from the server
function loadVideos() {
    fetch("/videos-data")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            videos = data;
            renderVideos(videos);
        })
        .catch((err) => {
            console.error("Failed to load videos:", err);
        });
}

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
        length: length.toFixed(2) // Ensure consistent format for length
    };

    // Send video data to the server
    fetch('/add-video', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVideo),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data.message);
            alert("Video posted successfully!");

            // Add the new video to the local array and re-render
            videos.push(newVideo);
            renderVideos(videos);

            // Clear form fields and close the popup
            document.getElementById("video-title").value = "";
            document.getElementById("video-poster").value = "";
            document.getElementById("video-thumbnail").value = "";
            document.getElementById("video-length").value = "";
            hidePopup("post-video-popup");
        })
        .catch(err => {
            console.error("Failed to post video:", err);
            alert("Failed to post video. Please try again.");
        });
}

// Search videos by title or author
document.getElementById("search-btn").addEventListener("click", function () {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(query) || video.poster.toLowerCase().includes(query)
    );
    renderVideos(filteredVideos);
})

// Load videos on page load
window.addEventListener("load", loadVideos)

// Logout button to return to index.html
document.getElementById("logout-btn").addEventListener("click", function () {
    window.location.href = "/";
})


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

//Post a new video Event Listener
document.getElementById("post-video-btn").addEventListener("click", postVideo)

/*const videoPosts = container.getElementsByClassName('video-post');
Array.from(videoPosts).forEach(videoPost => {
    videoPost.addEventListener('click', function () {
        const videoId = this.getAttribute('data-video-id');
        window.location.href = `/videos/1}`;
    });
});*/

