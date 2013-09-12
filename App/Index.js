var express = require('express');
var path = require('path');
var controller = require('./Controller.js');

var app = express();

var notFoundHandler = function(req, res) {
    res.statusCode = 404;
    res.description = 'Page not found.';
    res.render('notFound');
};

var errorHandler = function(err, req, res, next) {
    console.log("****ERROR****");
    console.log(err);
    
    res.statusCode = 500;
    res.description = 'Something went wrong';
    res.render('error');
};

app.configure(function() {
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/Views');
    app.use(express.static(path.join(__dirname, 'Public')));
    app.use(express.bodyParser());
    app.use(app.router); //Enable error handling
    app.use(notFoundHandler); //If not routes match, this will be called
    app.use(errorHandler); //Express knows a method with 4 params, is for handling errors
});

app.get('/', function(req, res) {
    res.redirect('/search');
});

app.get('/search', controller.search);
app.post('/search', controller.search);

app.listen(process.env.PORT, process.env.IP);
console.log('Nama-biru running...');