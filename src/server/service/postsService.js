const postsModel = require('../models/postsModel');


const postsService = {

    getPosts: async (req, res) => {
        const posts = await postsModel.find();
        console.log("required posts")
        res.status(200).send(posts);
    },

    createPost: async (req, res) => {
        const newPost = new postsModel({
            title: req.body.title,
            content: req.body.content
        });

        try{
            const savedPost = await newPost.save();
            console.log("created posts");
            res.status(200).send(savedPost);
        }catch(err){
            res.status(400).send(err);
        }
    }
}


module.exports = postsService;
