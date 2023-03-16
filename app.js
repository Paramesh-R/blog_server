var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Dependencies
const dotenv = require('dotenv').config()
var cors = require('cors');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/usersRoute');
var postsRouter = require('./routes/postsRoute');
var commentRouter = require("./routes/commentRouter");

var app = express();


// <===============view engine setup===============>
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// <===============================================>


// <===================Middleware===================>
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//<=================================================>


// <============= START Handle CORS ====================>
const corsConfig0 = { credentials: true, origin: true, };
const corsConfig1 = { credentials: true, origin: "*", };
app.use(cors(corsConfig0));
// <============= END Handle CORS ====================>


// <============= DATABASE CONNECTION ================>
const connectDB = require("./config/db")
connectDB()
// <==================================================>


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comment', commentRouter);


// <===============ERROR 404==========================>
// catch 404 and forward to error handler
app.use(function (req, res, next) { next(createError(404)); });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// <=================================================>
module.exports = app;
