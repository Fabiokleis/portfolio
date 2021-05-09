const postsModel = require('../models/postsModel');

const postsService = {

    getPosts: async (req, res) => {
        try{
            const posts = await postsModel.find();
            console.log("required posts")
            res.status(200).send(posts);
        }catch(err){
            res.status(404).send(err);
        }
    },

    getPost: async (req, res) => {
        const id = req.params.id;
        try{
            const post = await postsModel.findById(id);
            console.log("required one post");
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
            console.log("created post");
            res.status(200).send(savedPost);

        }catch(err){
            console.log(err);
            res.status(400).send(err);
            
        }
    },

    deletePost: async (req, res) => {
        const id = req.params.id;
        try{
            const deletedPost = await postsModel.findByIdAndDelete(id);
            console.log("deleted post");
            res.status(200).send(deletedPost);
        }catch(err){
            console.log(err);
            res.status(400).send(err);
        }
    }


}


module.exports = postsService;
