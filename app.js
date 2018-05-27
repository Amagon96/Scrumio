const express            = require('express');
const path               = require('path');
const favicon            = require('serve-favicon');
const logger             = require('morgan');
const cookieParser       = require('cookie-parser');
const bodyParser         = require('body-parser');
const port               = process.env.PORT || 8080;
const mongoose           = require('mongoose');
const passport           = require('passport');
const flash              = require('connect-flash');
const session            = require('express-session');
const MongoStore         = require('connect-mongo')(session);
const configDB           = require('./config/database.js');
const app = express();



mongoose.connect(configDB.urlPro);
const db = mongoose.connection;
require('./config/passport')(passport);

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootbox')); // redirect JS jQuery
app.use('/toast', express.static(__dirname + '/node_modules/jquery-toast-plugin/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/fullpage', express.static(__dirname + '/node_modules/fullpage.js'));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/index.js')(app, passport);
require('./routes/users.js')(app, passport);
require('./routes/abilities.js')(app, passport);
require('./routes/projects.js')(app, passport);
require('./routes/histories.js')(app, passport);
require('./routes/sprints.js')(app, passport);
require('./routes/tasks.js')(app, passport);
require('./routes/email.js')(app, passport);
require('./routes/members.js')(app, passport);
require('./routes/teams.js')(app, passport);
require('./routes/archives.js')(app, passport);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
