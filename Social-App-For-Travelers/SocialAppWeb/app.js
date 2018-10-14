var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var mongoose = require('mongoose');
var expressSession = require("express-session");
var fileUpload = require('express-fileupload');

var MySQLStore = require('express-mysql-session')(expressSession);


var index = require('./routes/index');
var users = require('./routes/users');
var profile = require('./routes/profile');
var newsfeed = require('./routes/newsfeed');
var trip = require('./routes/trip');
var app = express();
app.use(fileUpload());

//MySQL connection
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'travelers',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

var sessionStore = new MySQLStore(options);

//SETTING UP SESSION
app.use(expressSession({
	key: 'session_cookie_travelers',
    secret: 'travelers',
    resave: false,
    saveUninitialized: false,
    cookie: {},
    store: sessionStore
}));

// app.use(expressSession({
//         cookieName: 'session',
//         secret: 'travelers',
//         duration: 30 * 60 * 1000,    //setting the time for active session
//         activeDuration: 5 * 60 * 1000,
//         resave: false,
//         saveUninitialized: true
//     }
// ));

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
app.set("public",path.join(__dirname, 'public'));
//login
app.use('/', index);
app.use('/users', users);
app.use('/trip', trip);

//newsfeed
app.get('/newsfeedpage',newsfeed.getnewsfeedpage);
app.post('/getNewsFeed', newsfeed.getNewsFeed);
app.post('/postCommentOnTrip',newsfeed.postCommentOnTrip);
app.post('/postCommentOnPlace',newsfeed.postCommentOnPlace);
app.post('/likeTrip',newsfeed.likeTrip);
app.post('/likePlace',newsfeed.likePlace);
app.get('/getTripDetailsPage',newsfeed.getTripDetilsPage);
app.post('/getTripDetails',newsfeed.getTripDetails);
//profile management
app.get('/getUserAboutPage', profile.getUserAboutPage );
app.post('/followUnfollow',profile.followUnfollow);
app.post('/getusertimeline',profile.getusertimeline);
app.get('/mytimelinepage',profile.mytimelinepage);
app.post('/mytimeline',profile.mytimeline);
app.post('/myowntrip',profile.myowntrip);
app.get('/edit-profile-basic-page',profile.editProfileBasicPage);
app.post('/get-edit-profile-basic-info', profile.getEditProfileBasicInfo);
app.post('/uploadProfileImage', profile.uploadProfileImage);
app.get('/edit-profile-settings-page',profile.editProfileSettingPage);
app.get('/edit-profile-password-page',profile.editProfilePasswordPage);
app.post('/edit-profile-basic-save',profile.editProfileBasicSave);
app.post('/updatePassword',profile.updatePassword);

//Search Api's
app.get('/getSearchPage', newsfeed.getSearchPage);
app.post('/getSearchResults', newsfeed.getSearchResults);
app.post('/getSearchPlaces', newsfeed.getSearchPlaces);
app.post('/getSearchTrips', newsfeed.getSearchTrips);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.set('port', process.env.PORT || 3000);		
 		
 /**		
  * Create HTTP server.		
  */		
 		
 http.createServer(app).listen(app.get('port'), function(){		
   console.log('Express server listening on port ' + app.get('port'));		
 });
module.exports = app;
