
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')
var fs = require('fs')


var port = process.env.PORT || 3000
var app = express()

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

app.get('*', function (req, res) {
    res.status(404).render('404', {
        title: "404 - Page Not Found",
        css: "/styles.css"
    })
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})
