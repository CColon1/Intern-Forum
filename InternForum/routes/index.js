var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt      = require('express-jwt');
var Post     = mongoose.model('Post');
var Comment  = mongoose.model('Comment');
var auth     = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */

router.get('/posts/:posts_id', function(req,res,next){
  Comment.findById(request.params.posts_id, function(err,comments){
    if(err)
      response.send(err)
    response.json(comments);
  });
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
