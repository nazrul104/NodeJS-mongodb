var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes');
var users = require('./routes/user');
var engine  = require( 'ejs-locals' );
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

var db = mongoose.connect('mongodb://localhost/chefonline-dev', function(err)
{
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

 var TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

 var blogSchema = new mongoose.Schema({
  post_title: String,
  description: String,
  published_date:  { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});


var Todo = mongoose.model('Todo', TodoSchema);
var blog = mongoose.model('myblog', blogSchema);
var mydata=[{post_title: 'Blog NodeJS', description: "ABCD"},{name: 'AngularJS', description: "XYZ"}];
for (var i = 0; i < mydata.length; i++) 
{
  blog.create(mydata[i], function(err, todo){
    if(err) console.log(err);
    else console.log(todo);
});
};


/*app.get('/', routes.index);*/
app.get('/users', users.list);
app.post('/create',users.CreateCourse);

app.get('/edit/:id',users.edit);


app.get('/add',function(req,res)
{
	res.render("add_item");
});

app.get("/",users.list);
app.get('/delete/:id', users.destroy);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
