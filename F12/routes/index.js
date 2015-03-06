var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Leila-Chennai',oneliner: 'Share, lend and borrow.' });
});


router.get('/profiles',function(req,res,next){
	res.render('profile', {id : "M56"});
	//res.sendfile("template1.html");
});
router.get('/insertpost',function(req,res,next){
	var db = req.db;
	var posts = db.collection('posts');
	posts.insert({"username":"goutham","type":"bag","name":"traveller"},function(){
	res.send('ok');
		//console.log(e);
	});
	//res.status(200);
});
router.get('/myposts',function(req,res,next){
	var db = req.db;
	var current_user = req.query.username;//.username;
	var collection = db.collection('posts');
	//console.log(collection);
	collection.find({'username':current_user}).toArray(function(e,doc){
		res.status(200).json(doc);
	});
});
router.get('/friends_posts',function(req,res,next){
	var db = req.db;
	var current_user = 'venkatesh';//req.param.username;
	var collection = db.collection('posts');
	
	collection.find({username:current_user}).toArray(function(e,doc){
			//console.log(doc[0].friends[0]);
			collection.find({username:{$in:doc[0].friends[0]}}).toArray(function(e,d){
			res.json(d);
				
			});
	});
	//	res.render('post',table.find());/*
	//table.insert({'username': "mohan",'type':'household','name':'football'});
	//var myposts = {'username':'user','type':'book'};*/
});

module.exports = router;
