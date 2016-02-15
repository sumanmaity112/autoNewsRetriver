var fs = require('fs'); 
var page = require('webpage').create();
var url = 'https://news.google.co.in/news';
page.open(url, function(status) {
	var titles = page.evaluate(function() {
		var classes = document.getElementsByClassName('esc-lead-article-title');
		var images = document.getElementsByClassName('esc-thumbnail-image');
		var count = 0;
		return Array.prototype.map.call(classes,function(element){
			var ans ={};
			ans.url = element.children[0].getAttribute('url');
			ans.title = element.children[0].children[0].innerHTML;
			var imageSrc = images[count++].getAttribute('src');
			var image = imageSrc.match(/^data:image/) ? imageSrc : 'https:'+imageSrc;
			console.log(image.slice(10,20));
			ans.image = image;
			return ans;
		})
	});
	fs.write('news.json',JSON.stringify(titles));
	phantom.exit();
});
