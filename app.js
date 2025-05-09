var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
require('dotenv').config()
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var destinationRouter = require('./routes/destination');
var itineraryRouter = require('./routes/itinerary');
var activityRouter = require('./routes/activity');
var bookingRouter = require('./routes/booking');
var paymentRouter = require('./routes/payment');
var feedbackRouter = require('./routes/feedback');
var imageRouter = require('./routes/images');
var contactRouter = require('./routes/contact');

var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://yakshatpipaliya:lOLmRBAcNvb6FPCl@travel-planning-api.awf1pjg.mongodb.net/Travel-Planning-API?retryWrites=true&w=majority&appName=Travel-Planning-API')
  .then(() => {
    console.log("✅ MongoDB connection successful");
  })
  .catch((error) => {
    console.log("❌ MongoDB connection failed:", error.message);
  });


var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/', userRouter);
app.use('/destination', destinationRouter);
app.use('/itinerary', itineraryRouter);
app.use('/activity', activityRouter);
app.use('/booking', bookingRouter);
app.use('/payment', paymentRouter);
app.use('/feedback', feedbackRouter);
app.use('/images', imageRouter);
app.use('/contact', contactRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
