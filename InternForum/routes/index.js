var express  = require('express');
var router   = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var jwt      = require('express-jwt');
var Post     = mongoose.model('Post');
var auth     = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }
    res.json(posts);
  });
});
router.post('/posts', function(req, res, next) {
  var d = new Date();
  var post = new Post(req.body);
  post.author = "user";//req.payload.username;
  post.date = d.toDateString();
  post.save(function(err, post){
    if(err){ return next(err); }
    res.json(post);
  });
});


module.exports = router;
