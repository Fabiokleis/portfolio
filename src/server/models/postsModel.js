const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
     title: {type: String, required: true, minlength: 3, maxlength: 50},
     content: {type: String, required: true, minlenth: 10, maxlength: 255},
     createdAt: {type: Date, default: Date.now}
});

const postsModel = mongoose.model('postsmodel', postsSchema);

module.exports = postsModel;
