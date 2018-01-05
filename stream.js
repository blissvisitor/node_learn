'use strict'
var fs=require('fs');
//输入流
var rs=fs.createReadStream('./1.txt', 'utf-8');
rs.on('data',function(chunck){
	console.log('Start:');
	console.log(chunck);
});
rs.on('end',function(){
	console.log('End');
});
rs.on('error',function(error){
	console.log(error);
});
//输出流
var ws=fs.createWriteStream('./2.txt', 'utf-8');
ws.write('use stream write content to text\n');
ws.write('End.');
ws.end();
//输出流 buffer
var ws1=fs.createWriteStream('./3.txt','utf-8');
ws1.write(new Buffer('start write to 3.txt use buffer','utf-8'));
ws1.write(new Buffer('write end','utf-8'));
ws1.end();

//pipe 连接输入流输出流
var read=fs.createReadStream('./1.txt','utf-8');
var write=fs.createWriteStream('./2.txt','utf-8');
read.pipe(writ,e{end:false});