var app = require('http');
var qs = require('querystring');
var	mysql = require('mysql');

var	config = require('./config');
var f = require('./functii');
	
var connection = mysql.createConnection(config);

app.createServer(function (req, res) {

	if ('/' == req.url) {
		f.FillForm(res);
		
	} else if ('/auth' == req.url && 'POST' == req.method ) {
	
	var body = '';				
	req.on('data', function (chunk) {
			body += chunk;
	});

req.on('end', function (){
		
	if(qs.parse(body).password == 'aaaa'){
			
	newuser = new f.User(qs.parse(body).name);	
		var user = { nume: newuser.nume, on: 1 };
					
	f.NewUser(connection, user);
								
	res.writeHead(200, { 'Content-Type': 'text/html'});
	res.write('Hello <b>' + newuser.nume + '!<b><br><br>');	
	res.write('Users online: <br><br>');
							
	console.log('Welcome ' + newuser.nume +'!');
	console.log('Users online: ');
						
		var usern = newuser.nume;
		f.GetUserQ(connection, res, usern);
	} else {
		res.writeHead(404);
		res.end("Wrong password!");
		}			
});
		
		//res.write('<href="/" Logout>');
}	
}).listen(3000);
