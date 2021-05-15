const express = require('express');
const router = express.Router();
const usersService = require('../service/usersService');


router.get('/', express.json(), usersService.getUsers);

router.get('/:id', usersService.getUser);

router.post('/', express.json(), usersService.createUser);

router.put('/:id', express.json(), usersService.updateUserName);

router.delete('/:id', usersService.deleteUser);


module.exports = router;
