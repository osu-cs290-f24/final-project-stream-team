
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

app.get('/videos/:n', function (req, res) { //not sure if most of this is the right way to do it
    var filePath = path.join(__dirname, 'static/videos.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log('Error reading JSON file: ', err)
            res.status(500).send("Error loading videos.")
            return
        }

        const videos = JSON.parse(data)
        let videoList = []
        var vidNum = parseInt(req.params.n, 10)

        if (vidNum >= 0 && vidNum < videos.length) {
            //gets recommended videos, just uses the next two in the list
            var vidNum2 = (vidNum + 1) % videos.length
            var vidNum3 = (vidNum2 + 1) % videos.length
            console.log(vidNum)
            console.log(vidNum2)
            console.log(vidNum3)


            videoList.push(videos[vidNum2])
            videoList.push(videos[vidNum3])

            res.render('singleVid', { //not sure if this is right at all
                title: 'Single Video',
                css: '/single_video.css',
                video: videos[vidNum], //for the single video
                videoList: videoList //for the recommended videos
            })
        }
        else {
            res.status(404).render('404', {
                title: "404 - Page Not Found",
                css: "/styles.css"
            })
        }
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
