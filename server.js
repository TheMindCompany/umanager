var data = require('./data');
var app = require('./app.js')(data);
var https = require('https');
var http = require('http');
var fs = require('fs');

var options = {
    key: fs.readFileSync('/opt/ssl/local.key'),
    cert: fs.readFileSync('/opt/ssl/local.crt'),
    requestCert: true,
    rejectUnauthorized: false
};

app.set('port-ssl', process.env.PORT || 3443);
app.set('port', process.env.PORT || 3000);

var server = https.createServer(options, app).listen(app.get('port-ssl'), function() {
  console.log('Secure Express server listening on port ' + server.address().port);
});

var httpServer = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + httpServer.address().port);
});
