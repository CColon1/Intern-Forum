var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt      = require('express-jwt');
var Post     = mongoose.model('Post');
var auth     = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.post('/register', function(req, res, next){
  console.log(req.body);
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();
  user.username = req.body.username;

  user.setPassword(req.body.password);

  console.log('test2');

  user.save(function (err, user){
    console.log('test3');
    if(err)
      return next(err);
    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
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
