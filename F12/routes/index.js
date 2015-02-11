var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express OK!!' });
});


router.get('/profiles',function(req,res,next){
	res.render('profile', {id : "M56"});
	//res.sendfile("template1.html");
});

module.exports = router;
