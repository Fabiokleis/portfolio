const express = require('express');
const router = express.Router();
const auth = require('../service/authService');
const PostsService = require('../service/postsService');
const PostsValidator = require('../validate/postsValidation');

router.get('/', express.urlencoded({extended: true}), async(req, res, next) => {
    try{
        const valueObj = await PostsValidator.validatePage(req.query);
        const postsService = new PostsService(valueObj);
        const posts = await postsService.getAllPosts();
        res.status(200).json(posts);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.post('/', express.json(), async(req, res, next) => {
    try{
        const valueObj = await PostsValidator.createPost(req.body);
        const postsService = new PostsService(valueObj);
        const result = await postsService.savePost();
        res.status(200).json(result);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.put('/', auth, express.json(), express.urlencoded({extended: true}), 
    async(req, res, next) => {
       try{
           req.body.user_id = req.user.id;
           req.body.id = parseInt(req.query.id);
           const valueObj = await PostsValidator.updatePost(req.body);
           const postsService = new PostsService(valueObj);
           const result = await postsService.updatePost();
           
           res.status(200).json(result);
       }catch(err){
           err.statusCode = 404;
           next(err);
       }
    }
);

module.exports = router;
