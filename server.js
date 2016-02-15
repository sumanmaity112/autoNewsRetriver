var http = require('http');
var unirest = require('unirest');
var fs = require('fs');
var express = require('express');
var exec = require('child_process').execSync;
var app = express();
const PORT = 4000;
var news={};
var retriveNews = function(){
	exec('~/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs autoFindNews.js');
	news = JSON.parse(fs.readFileSync('news.json','utf8'));
};
var createNotification = function(){
	unirest.post('https://maker.ifttt.com/trigger/news_retrive_server_started/with/key/msgN6ma8yqBKuqvpEXtpE-xISASkldSj8eXRd-Hb1nk')
	.end(function(response){});
};

setInterval(function(){
	retriveNews();
},600000);
retriveNews();
createNotification();


app.set('view engine','jade');
app.use(express.static('./HTML'));
app.get('/',function(req,res){
	res.render('news',{news:news});
});

var server = http.createServer(app);
server.listen(PORT);