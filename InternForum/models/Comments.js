var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({ 
  body: String,
  date: String,
  author: String,
  Post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});
mongoose.model('Comment', CommentSchema);

