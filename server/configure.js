/**
 * Created by Nicholas Barry on 2/17/2016.
 */
var methodOverride = require('method-override');

module.exports = function(app){
    app.set('port', process.env.PORT || 3300);
    app.set('views', __dirname + '/views');

    app.use(methodOverride());

    return app;
};