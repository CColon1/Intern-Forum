var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var jwt      = require('express-jwt');
var Post     = mongoose.model('Post');
var Comment  = mongoose.model('Comment');
var Category = mongoose.model('Category');
var auth     = jwt({secret: 'SECRET', userProperty: 'payload'});

router.param('post', function(req,res,next,id){
  var query = Post.findById(id);

  query.exec(function(err,post){
    if(err) {return next(err);}
    if(!post){return next(new Error('can\'t find post'));}

    req.post = post;
    return next(); 
  });
});
router.param('category', function(req,res,next,id){
  var query = Category.findById(id);

  query.exec(function(err,category){
    if(err) {return next(err);}
    if(!category){return next(new Error('can\'t find category'));}

    req.category = category;
    return next(); 
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Intern Forum' });
});
//get all categories
router.get('/category', function(req, res, next) {
  Category
  .find()
  .populate('posts')
  .exec(function(err,category){
    if(err){return nex(err);}
    res.json(category);
  });
});

router.get('/posts', function(req, res, next) {
  Post.find(function(err, posts){
    if(err){ return next(err); }
    res.json(posts);
  });
});

//create a post
router.post('/category/:category', function(req, res, next) {
  var d = new Date();
  var post = new Post(req.body);
  post.author = "user";//req.payload.username;
  post.date = d.toDateString();
  post.save(function(err, post){
    if(err){ return next(err); }

    req.category.posts.push(post)
    req.category.save(function(err,category){
      if(err){return next(err);}
        res.json(post);
    });
    
  });
});

//get one post
router.get('/posts/:post',function(req,res,next){
  console.log(req) ;
  req.post.populate('comments',function(err,post){
    if (err)  {return next(err);}
    res.json(post);
  })
});

//create a comment on a specific post
router.post('/posts/:post/comments', function(req,res,next){
  var comment = new Comment(req.body);
  comment.post = req.post;
  comment.author = "user";
  comment.save(function(err,comment){
    if(err){ return next(err);}
    req.post.comments.push(comment);
    req.post.save(function(err,post){
      if(err) {return next(err);}
      res.json(comment);
    })
  })
})


module.exports = router;
