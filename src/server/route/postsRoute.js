const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');

router.get('/posts', express.json(), postsService.getPosts);
router.get('/posts/:id', postsService.getPost);
router.post('/posts', express.json(), postsService.savePost);
//router.put('/posts/:id');
router.delete('/posts/:id', postsService.deletePost);


module.exports = router;
