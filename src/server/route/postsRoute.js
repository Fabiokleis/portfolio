const express = require('express');
const router = express.Router();
const postsService = require('../service/postsService');

router.get('/posts', express.json(), postsService.getPosts);
//router.get('/posts/:id');
router.post('/posts', express.json(), postsService.createPost);
//router.put('/posts/:id');
//router.delete('/posts/:id');


module.exports = router;
