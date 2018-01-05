'use strict'
var http=require('http');
http.createServer(function(req,res){
	console.log(req.method+','+req.url);
	res.writeHead('200',{'Content-Type':'text/html'});
	res.end('<h1>Hello World!</h1>');
}).listen('8088');
console.log('server listen 8088')