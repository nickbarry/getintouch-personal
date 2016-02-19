/**
 * Created by Nicholas Barry on 2/17/2016.
 */
var path = require('path'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    methodOverride = require('method-override'),
    routes = require('./../routes/routes'),
    moment = require('moment');

module.exports = function(app){
    app.set('port', process.env.PORT || 3300);
    app.set('views', __dirname + '/views');

    app.use(methodOverride());
    routes(app);
    app.use('/public/',
        express.static(path.join(__dirname, '../public')));

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

    return app;
};