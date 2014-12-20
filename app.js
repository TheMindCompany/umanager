module.exports = function (data) {
	
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');

var routeHome = require('./routes/index')(data);
var routeCatalog = require('./routes/catalog')(data);
var routeStudent = require('./routes/student')(data);
var routeAccount = require('./routes/account')(data);
var routeCredential = require('./routes/credentials')(data);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session create
var hour = 3600000;

app.use(session({
	genid: function(req) {
		  return uuid.v4();
	},
	secret: 'csu fullerton',
	cookie: { secure:  true,
			  expires: new Date(Date.now() + hour),
			  maxAge:  hour },
	saveUninitialized: true,
    resave: true
}));
app.use(function(req, res, next){
	var checkUser = data.user.userCheck(req, res, next);
});

app.use(function(req, res, next){
	data.catalog.getCurrentDetail(function(err, sessionOne){
		data.catalog.getNextDetail(function(err, sessionTwo){
			req.session.school = {name: 'University Manager',
                    		      in_progress: sessionOne,
					              register:    sessionTwo };
			next();
		});
	});
});

// Force HTTPS connections
function ensure(req, res, next){
	var port = app.get('port') === 80 ? '' : ':' + app.get('port-ssl'); // Only for testing under local ENV
	
	if(req.secure){
	  // OK, continue
	  return next();
	}
	res.redirect('https://' + req.hostname + port + req.url); 
}
app.all('*', ensure); // Top of routes. (Required to push HTTPS.)

// Route to data manipulation and content
app.use('/', routeHome);
app.use('/catalog', routeCatalog);
app.use('/student', routeStudent);
app.use('/account', routeAccount);
app.use('/credentials', routeCredential);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'dev') {
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

return app;
};
