var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var controller = require('./routes/controller');
var users = require('./routes/users');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/controller', controller);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.get('/', function(request, response) {
  response.render('views/index');
});

// var clients=[];

// Socket.io code
io.on('connection', function(socket) {
    var sid = socket.id;
    //clients.push(sid);
    io.emit('new client', { id : sid });

    socket.on('up', function() {
        console.log('up');
        io.emit('up', sid);
    });
    socket.on('right', function() {
        console.log('right');
        io.emit('right', sid);
    });
    socket.on('down', function() {
        console.log('down');
        io.emit('down', sid);
    });
    socket.on('left', function() {
        console.log('left');
        io.emit('left', sid);
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
        io.emit('user disconnected', sid);
    });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;
