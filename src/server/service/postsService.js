const postsModel = require('../models/postsModel');

const postsService = {

    getPosts: async (req, res) => {
        try{
            const posts = await postsModel.find();
            console.log("required posts");
            res.status(200).send(posts);
        }catch(err){
            res.status(404).send(err);
        }
    },

    getPost: async (req, res) => {
        const id = req.params.id;
        try{
            const post = await postsModel.findById(id);
            console.log("required post", post._id);
            res.status(200).send(post);
        }catch(err){
            res.status(404).send(err);
        }
    },
    
    savePost: async (req, res) => {
        const newPost = new postsModel({
            title: req.body.title,
            content: req.body.content
        });
        try{
            const savedPost = await newPost.save();
            console.log("created post", savedPost._id);
            res.status(200).send(savedPost);

        }catch(err){
            console.log(err);
            res.status(400).send(err);
            
        }
    },

    updatePost: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try{
            const updatedPost = await postsModel.findOneAndUpdate(
                {_id: id}, 
                { $set: {title: data.title, content: data.content}},
                {new: true});
            
            console.log("post updated", updatedPost._id);
            res.status(200).send(updatedPost);
        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    },

    deletePost: async (req, res) => {
        const id = req.params.id;
        try{
            const deletedPost = await postsModel.findByIdAndDelete(id);
            console.log("deleted post", deletedPost._id);
            res.status(200).send(deletedPost);
        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    }


}


module.exports = postsService;
