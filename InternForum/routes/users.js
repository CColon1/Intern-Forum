var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
//var db = mongoose.connection.db;
var db = require("mongoose").connection.db
var gfs = new Grid(db);

/* GET users listing. */
router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;

  user.setPassword(req.body.password)

  user.save(function (err){
    if(err){ return next(err); }

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


router.post('/user/',function(req,res,callback) {
  var part = req.files.filefield;
  var writeStream = gfs.createWriteStream({
    filename: part.name,
    mode: 'w',
    username : part.user,
    content_type:part.mimetype
  });

  gfs.files.find({filename : part.user}).toArray(function(err,files){
    if(files.length > 0){
      gfs.files.remove({filename : part.user}, function(err){
        if(err){
          return err;
        }
      })
    }});

  writeStream.on('close', function(){
    return res.status(200).send({
      message : 'success'
    });
  });


  writeStream.write(part.data);

  writeStream.end();

})

router.get('/user/:picture', function(req,res,callback){
  gfs.files.find({filename : req.params.picture}).toArray(function(err,files){
    if(files.length == 0)
    {
      return res.status(200).send({message : 'file not found, searched by: ' + req.params.picture});
    }
    res.writeHead(200, {'Content-Type': files[0].contentType});

    var readstream = gfs.createReadStream({
      filename : files[0].filename
    });

    readstream.on('data', function(data) {
      res.write(data);
    });

    readstream.on('end', function() {
      res.end();
    });

    readstream.on('error', function (err) {
      console.log('An error occurred!', err);
      throw err;
    });

  })
})


module.exports = router;
