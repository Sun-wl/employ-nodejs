var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


var index = require('./routes/index');
var stus = require('./routes/stus');
var managers = require('./routes/managers');
var provinces = require('./routes/provinces');
var pasterns = require('./routes/pasterns');
var profs = require('./routes/profs');
var clazzs = require('./routes/clazzs');
var employRate = require('./routes/employRate');
var employDistbt = require('./routes/employDistbt');
var passwordUpdate = require('./routes/passwordUpdate');

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:63343"); //需要显示设置来源
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true);
    res.header("Access-Control-Max-Age","3600");
    res.header("Cache-Control", "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));



app.use('/', index);
app.use('/stus', stus);
app.use('/managers', managers);
app.use('/provinces', provinces);
app.use('/pasterns', pasterns);
app.use('/profs', profs);
app.use('/clazzs', clazzs);
app.use('/employRate', employRate);
app.use('/employDistbt', employDistbt);
app.use('/passwordUpdate', passwordUpdate);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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
