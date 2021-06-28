const express = require('express');
const router = express.Router();
const auth = require('../service/authService');
const PostsService = require('../service/postsService');
const PostsValidator = require('../validate/postsValidation');


router.get('/profile_posts', auth, express.urlencoded({extended: true}) ,async(req, res, next) => {
    try{
        const user_id = req.user.id;
        const page = req.query.page;
        const postsService = new PostsService({user_id, page});
        const {allUserPosts, count} = await postsService.getUserLastPosts();
        res.header(count);
        res.status(200).json(allUserPosts);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.get('/', express.urlencoded({extended: true}), async(req, res, next) => {
    try{
        const valueObj = await PostsValidator.validatePage(req.query);
        const postsService = new PostsService(valueObj);
        const {allPosts, count} = await postsService.getAllPosts();
        res.header(count);
        res.status(200).json(allPosts);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.post('/', auth, express.json(), async(req, res, next) => {
    try{
        req.body.user_id = req.user.id;
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

router.delete('/', auth, express.urlencoded({extended: true}), 
    async(req, res, next) => {
       try{
           const user_id = req.user.id;
           const id = parseInt(req.query.id);
           const data = {user_id, id};
           const valueObj = await PostsValidator.deletePost(data);
           const postsService = new PostsService(valueObj);
           const result = await postsService.deletePost();
           
           res.status(200).json(result);
       }catch(err){
           err.statusCode = 404;
           next(err);
       }
    }
);


module.exports = router;
