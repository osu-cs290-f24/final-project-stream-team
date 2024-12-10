let videos = [];

//render videos dynamically
function renderVideos(videoList) {
    const container = document.getElementById("video-container");
    container.innerHTML = "";

    videoList.forEach((video) => {
        const minutes = Math.floor(video.length);
        const seconds = Math.round((video.length - minutes) * 60).toString().padStart(2, "0");

        //use the video's originalIndex to maintain a stable ID
        const videoHTML = Handlebars.templates.video({
            photoURL: video.thumbnail,
            alt: video.title,
            title: video.title,
            name: video.poster,
            minutes: minutes,
            seconds: seconds,
            index: video.originalIndex // pass originalIndex instead of 'i'
        });

        container.insertAdjacentHTML("beforeend", videoHTML);
    });

    const videoPosts = document.querySelectorAll(".video-post");
    videoPosts.forEach((post) => {
        post.addEventListener("click", function () {
            const videoId = this.getAttribute("data-id");
            if (videoId) {
                window.location.href = `/videos/${videoId}`;
            }
        });
    });
}






//formats video length as MM:SS
function formatVideoLength(videoLength) {
    const minutes = Math.floor(videoLength);
    const seconds = Math.round((videoLength - minutes) * 60).toString().padStart(2, "0");
    return `${minutes}:${seconds} `;
}


//fetche videos from the server
function loadVideos() {
    fetch("/videos-data")
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then((data) => {
            // Map each video to store its original index
            videos = data.map((video, i) => {
                return { ...video, originalIndex: i };
            });
            renderVideos(videos);
        })
        .catch((err) => {
            console.error("Failed to load videos:", err);
        });
}



//post a new video
function postVideo() {
    const title = document.getElementById("video-title").value.trim();
    const poster = document.getElementById("video-poster").value.trim();
    const thumbnail = document.getElementById("video-thumbnail").value.trim();
    const length = parseFloat(document.getElementById("video-length").value);

    if (!title || !poster || !thumbnail || isNaN(length)) {
        alert("Please fill in all fields with valid values.");
        return;
    }

    const newVideo = {
        title,
        poster,
        thumbnail,
        length: length.toFixed(2)
    };

    fetch('/add-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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

            if (window.location.pathname === "/videos") {
                videos.push(newVideo);
                renderVideos(videos);
            }

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


//search videos by title or author
document.getElementById("search-btn").addEventListener("click", function () {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filteredVideos = videos.filter((video) =>
        video.title.toLowerCase().includes(query) ||
        video.poster.toLowerCase().includes(query)
    );
    renderVideos(filteredVideos); //this properly clears and re-renders filtered videos
});


//load videos on page load
window.addEventListener("load", loadVideos)

//logout button to return to index.html
document.getElementById("logout-btn").addEventListener("click", function () {
    window.location.href = "/";
})


function showPopup(popupId) {
    document.getElementById(popupId).hidden = false;
}

function hidePopup(popupId) {
    document.getElementById(popupId).hidden = true;
}

//show the "Post Video" popup
document.getElementById("post-video-open-btn").addEventListener("click", function () {
    showPopup("post-video-popup");
});

//close the "Post Video" popup
document.getElementById("close-post-video-btn").addEventListener("click", function () {
    hidePopup("post-video-popup");
});

//post a new video Event Listener
document.getElementById("post-video-btn").addEventListener("click", postVideo)

document.getElementById("dropdown-menu").addEventListener("change", function () {
    const selectedOption = this.value

    let sortedVideos = videos.slice() //makes copy

    if (selectedOption === "Author: A-Z") {
        for (let i = 0; i < sortedVideos.length - 1; i++) {
            for (let j = i + 1; j < sortedVideos.length; j++) {
                if (sortedVideos[i].poster > sortedVideos[j].poster) {
                    let temp = sortedVideos[i]
                    sortedVideos[i] = sortedVideos[j]
                    sortedVideos[j] = temp
                }
            }
        }
    } 
    else if (selectedOption === "Title: A-Z") {
        for (let i = 0; i < sortedVideos.length - 1; i++) {
            for (let j = i + 1; j < sortedVideos.length; j++) {
                if (sortedVideos[i].title > sortedVideos[j].title) {
                    let temp = sortedVideos[i]
                    sortedVideos[i] = sortedVideos[j]
                    sortedVideos[j] = temp
                }
            }
        }
    } 
    else if (selectedOption === "Length: Shortest") {
        for (let i = 0; i < sortedVideos.length - 1; i++) {
            for (let j = i + 1; j < sortedVideos.length; j++) {
                if (sortedVideos[i].length > sortedVideos[j].length) {
                    let temp = sortedVideos[i]
                    sortedVideos[i] = sortedVideos[j]
                    sortedVideos[j] = temp
                }
            }
        }
    } 
    else {
        sortedVideos = videos.slice()
    }

    renderVideos(sortedVideos)
})
