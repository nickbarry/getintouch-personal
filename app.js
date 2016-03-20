var express = require('express');
var exphbs = require('express-handlebars');
var morgan = require('morgan');
var flash = require('connect-flash');
var path = require('path');
var methodOverride = require('method-override');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var moment = require('moment');
var errorHandler = require('errorhandler');
var config = require('./configUntracked');

var router = require('./routes/routes');

var app = express();

// view engine setup
app.engine('handlebars', exphbs.create({
    defaultLayout: 'main',
    layoutsDir: app.get('views') + '/layouts',
    partialsDir: app.get('views') + '/partials',
    helpers: {
        timeago: function(timestamp){
            return moment(timestamp).startOf('minute').fromNow();
        }
    }
}).engine);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // TODO: I don't think this is working
app.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // TODO: For the corresponding html, see the textbook note
        // here (see the section on Views):
        // and their explanation: "An interesting detail in the preceding
        // code is that we override the method interpreted on the server
        // side from POST to DELETE by passing a hidden field called _method.
        // This functionality is provided by the methodOverride middleware
        // of Express, which we included in the app.js file.".

        // look in url - encoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));
app.use(cookieSession({
    secret: config.sessionSecret,
    cookie: {
        maxAge: config.sessionMaxAge
    }
}));
app.use(flash());

app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
if(app.get('env') === 'development'){
    app.use(errorHandler());
    // Here's a useful way of setting up special middleware depending on
    // the environment:
    // https://www.packtpub.com/packtlib/book/Web%20Development/9781783981083/2/ch02lvl1sec17/Environment-based%20loading%20of%20middleware
}
// will print stacktrace
//if (app.get('env') === 'development') {
//    app.use(function(err, req, res, next) {
//        res.status(err.status || 500);
//        res.render('error', {
//            message: err.message,
//            error: err
//        });
//    });
//}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




module.exports = app;