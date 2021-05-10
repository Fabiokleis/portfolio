const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');


router.get('/posts', express.json(), postsService.getPosts);
router.get('/posts/:id', express.urlencoded({extended: true}),postsService.getPost);
router.post('/posts', express.json(), postsService.savePost);
router.put('/posts/:id', express.json(), postsService.updatePost);
router.delete('/posts/:id', postsService.deletePost);


module.exports = router;
