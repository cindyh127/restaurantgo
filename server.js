var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var admin = require("firebase-admin");

var serviceAccount = require('./food-project-ebea1-firebase-adminsdk-xuzrs-7dfbfd0c8c.json')

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://food-project-ebea1.firebaseio.com"
})


var app = express()


//set up ejs

app.set('view engine', 'ejs')

app.use(express.static('views'))
app.set('views', __dirname + '/views')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(logger('dev'))



app.get('/', function(request, response) {
    response.render('home.ejs')
})

app.get('/calculate', function(request, response) {
    response.render('calculator.ejs')
})

app.get('/profile', function(request, response) {
    response.render('profile.ejs')
})


app.get('/home1', function(request,response){
    response.render('home1.ejs')
})


app.post('/', function(request,response){

})

var port = process.env.PORT || 8080

app.listen(port, function() {
    console.log(`App running on ${port}.`)
})