document.addEventListener('DOMContentLoaded', () => {
    console.log(videoData)
    console.log(recommendedVideos)
    const backButton = document.getElementById('back-btn')
    backButton.addEventListener('click', function () {
        window.location.href = '/videos'
    })

    //insert main vid
    const mainContainer = document.getElementById("main-vid")
    mainContainer.textContent = ""

    const minutes = Math.floor(videoData.length)
    const seconds = Math.round((videoData.length - minutes) * 60).toString().padStart(2, "0")

    const mainVidHTML = Handlebars.templates.video({
        photoURL: videoData.thumbnail,
        alt: videoData.title,
        title: videoData.title,
        name: videoData.poster,
        minutes: minutes,
        seconds: seconds
    })

    mainContainer.insertAdjacentHTML("beforeend", mainVidHTML)
    //main vid end

    //insert recommended vids
    const otherVideosContainer = document.getElementById("other-videos-flex")
    otherVideosContainer.textContent = ""

    recommendedVideos.forEach(video => {
        const minutesOther = Math.floor(video.length);
        const secondsOther = Math.round((video.length - minutesOther) * 60).toString().padStart(2, "0");
        console.log('video title', video.title);

        const otherVidsHTML = Handlebars.templates.video({
            photoURL: video.thumbnail,
            alt: video.title,
            title: video.title,
            name: video.poster,
            minutes: minutesOther,
            seconds: secondsOther
        });

        otherVideosContainer.insertAdjacentHTML("beforeend", otherVidsHTML);
    });
    //recommended vids end
})