
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')


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
        css: '/index.css'
    })
})

app.get('/videos', function (req, res) {
    //examples - need to load from file
    const videos = [
        { title: 'Video 1', description: 'Description of Video 1' },
        { title: 'Video 2', description: 'Description of Video 2' },
    ];
    res.render('videos', {
        title: 'Video Gallery',
        css: '/videos.css',
        videos
    })
})

app.get('*', function (req, res) {
    res.status(404).render('404', { title: "404 - Page Not Found" })
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})
