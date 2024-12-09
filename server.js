
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
var fs = require('fs')

var app = express()
app.use(express.json())

var port = process.env.PORT || 3000


// set up handlebars
app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
}))
app.set("view engine", "handlebars")

app.use(express.static(path.join(__dirname, 'static')))

//app.use(express.static('static'))\



app.get('/', function (req, res) {
    res.render('index', {
        title: 'Video Gallery',
        css: '/styles.css'
    })
})

app.get('/videos-data', function (req, res) {
    const filePath = path.join(__dirname, 'static/videos.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err)
            res.status(500).json({ error: "Failed to load videos" })
            return
        }

        const videos = JSON.parse(data);
        res.json(videos); // Send video data as JSON
    })
})


app.get('/videos', function (req, res) {
    var filePath = path.join(__dirname, 'static/videos.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading JSON file: ', err)
            res.status(500).send("Error loading videos.")
            return
        }

        const videos = JSON.parse(data)
        res.render('videos', {
            title: 'Video Gallery',
            css: '/styles.css',
            videos
        })
    })
})


// get single page video and reccomendations
app.get('/videos/:n', function (req, res) {
    const filePath = path.join(__dirname, 'static/videos.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            res.status(500).send('Error loading videos.');
            return;
        }

        const videos = JSON.parse(data);
        const vidNum = parseInt(req.params.n, 10);

        // Validate that the requested video index is valid
        if (vidNum >= 0 && vidNum < videos.length) {
            const video = videos[vidNum];

            // Add calculated fields to the video
            const videoLength = video.length;
            const minutes = Math.floor(videoLength);
            const seconds = Math.round((videoLength - minutes) * 60).toString().padStart(2, "0");
            video.minutes = minutes;
            video.seconds = seconds;
            video.name = video.poster
            video.photoURL = video.thumbnail;

            // Generate a list of recommended videos
            const videoList = [];
            for (let i = 1; i <= 2; i++) {
                const nextIndex = (vidNum + i) % videos.length;
                const recommendedVideo = { ...videos[nextIndex] };

                // Calculate and add minutes/seconds for recommended videos
                const recommendedLength = recommendedVideo.length;
                const recommendedMinutes = Math.floor(recommendedLength);
                const recommendedSeconds = Math.round((recommendedLength - recommendedMinutes) * 60).toString().padStart(2, "0");
                recommendedVideo.minutes = recommendedMinutes;
                recommendedVideo.seconds = recommendedSeconds;
                recommendedVideo.name = recommendedVideo.poster;
                recommendedVideo.photoURL = recommendedVideo.thumbnail;

                videoList.push(recommendedVideo);
            }

            // Render the singleVid template with the selected video and recommendations
            res.render('singleVid', {
                title: video.title,
                css: '/single_video.css',
                video: video,
                videoList: videoList,
            });
        } else {
            res.status(404).render('404', {
                title: '404 - Page Not Found',
                css: '/styles.css',
            });
        }
    });
});



// get user data in logins
app.get('/users-data', function (req, res) {
    const filePath = path.join(__dirname, 'static/users.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            res.status(500).json({ error: "Failed to load users" });
            return;
        }

        const users = JSON.parse(data);
        res.json(users); // Send user data as JSON
    });
});


// Add POST endpoint to save new users
app.post('/add-user', function (req, res) {
    const newUser = req.body; // Extract user data from request body
    const filePath = path.join(__dirname, 'static/users.json')

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err)
            res.status(500).json({ error: "Failed to read user data." })
            return
        }

        let users = JSON.parse(data)
        const isDuplicate = users.some(u => u.username === newUser.username)

        if (isDuplicate) {
            res.status(400).json({ error: "Username already exists." })
            return
        }

        users.push(newUser)

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error("Error writing JSON file:", err);
                res.status(500).json({ error: "Failed to save user." })
                return;
            }

            console.log("New user added:", newUser);
            res.status(200).json({ message: "User added successfully!" })
        })
    })
})

// New POST route to save videos
app.post('/add-video', function (req, res) {
    const newVideo = req.body // Extract video data from request body
    const filePath = path.join(__dirname, 'static/videos.json')

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            res.status(500).json({ error: "Failed to read video data." })
            return
        }

        // Parse existing videos and add the new video
        let videos = JSON.parse(data)
        videos.push(newVideo)

        // Write the updated videos array back to the file
        fs.writeFile(filePath, JSON.stringify(videos, null, 2), (err) => {
            if (err) {
                console.error("Error writing JSON file:", err);
                res.status(500).json({ error: "Failed to save video." })
                return
            }

            console.log("New video added:", newVideo)
            res.status(200).json({ message: "Video added successfully!" })
        })
    })
})

app.get('*', function (req, res) {
    res.status(404).render('404', {
        title: "404 - Page Not Found",
        css: "/styles.css"
    })
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})
