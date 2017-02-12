var express = require('express');
var router = express.Router();
// photos.push({
// 	name:'Node.js Logo',
// 	path:'http://nodejs.org/images/logos/nodejs-green.png'
// });
// photos.push({
// 	name:'Ryan Speaking',
// 	path:'http://nodejs.org/images/ryan-speaker.jpg'
// });
/* GET home page.
处理photo */

router.get('/', function(req, res, next) {
  res.render('index',{
		title:'photos',
		photos:photos
	});
});
module.exports = router;
