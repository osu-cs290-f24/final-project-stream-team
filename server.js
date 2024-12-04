
var path = require('path')
var express = require('express')
var exphbs = require('express-handlebars')


var port = process.env.PORT || 3000
var app = express()


app.engine("handlebars", exphbs.engine({
    defaultLayout: "main"
  }))
app.set("view engine", "handlebars")

app.use(express.static(path.join(__dirname, 'static')))

//app.use(express.static('static'))

app.get('*', function (req, res) {
    res.status(404).render('404', { title: "404" })
})

app.listen(port, function () {
    console.log("== Server is listening on port", port)
})
