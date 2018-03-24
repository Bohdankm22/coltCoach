let express = require('express'),
    createError = require('http-errors'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    app = express(),
    port = process.env.PORT || 3000,
    // FishTrack = require('./api/models/fishTrackModel'), //created model loading here
    bodyParser = require('body-parser');

//Adding EJS view template engine
app.set('view engine', 'ejs');
app.set('views', './views');

//Adding routes
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

//Adding MiddleWare
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/public", express.static(__dirname + "/public"));



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

app.listen(port);


console.log('Server started at: ' + 'http://localhost:' + port);

module.exports = app;
