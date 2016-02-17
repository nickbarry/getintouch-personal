/**
 * Created by Nicholas Barry on 2/8/2016.
 */
var express = require('express'),
    app = express(),
    config = require('./server/configure');

app = config(app);