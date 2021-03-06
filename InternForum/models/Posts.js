var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: String,
  author: String,
  comments: [{ type : mongoose.Schema.Types.ObjectId, ref : 'Comment' }], //array of objectIds from schema 'comment'
  category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}


});
mongoose.model('Post', PostSchema);

