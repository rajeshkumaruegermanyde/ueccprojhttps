var express = require('express');
var http = require('http');
var https = require('https');

// START OF CHANGE
var app = express();
var fs = require('fs');

var secure = require('express-force-https');

app.use(secure);
app.use(express.static(__dirname + '/public'));

var port=3000;	
const httpOptions = {}

var cfenv = require('cfenv');
var env = process.env.NODE_ENV || 'dev';
// read settings.js
if(env=='dev')
{
var settings = require('./settings_local.js');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
else
{
var settings = require('./settings.js');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}	



  
if(env!='dev')
{
	var appEnv = cfenv.getAppEnv();
	var port = appEnv.port;
	app.listen(appEnv.port, function(){
		
	})
}
else	
{	
const httpsOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}
const server = https.createServer(httpsOptions, app).listen(port, () => {
  console.log('server running at local port:' + port)
})
};








app.get('/', function(req, res) {

res.sendFile(__dirname+'/public/index.html');


//res.send('<html><body>hello</body></html>')

});






