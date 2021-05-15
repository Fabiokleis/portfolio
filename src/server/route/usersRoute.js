const express = require('express');
const router = express.Router();
const usersService = require('../service/usersService');


router.get('/', express.json(), async(req, res, next) => {
    try{
        const results = await usersService.getUsers();
        res.status(200).json(results);
    }catch(err){
        next(err);
    }
});

router.get('/:id', async(req, res, next) => {
    try{
        const results = await usersService.getUser(req);
       
        res.status(200).json(results); 
    }catch(err){
        next(err);
    }
});
  
router.post('/', express.json(), async(req, res, next) => { 
    try{
        const results = await usersService.createUser(req);
        res.status(201).json(results);
    }catch(err){
        next(err);
    }
});

router.put('/:id', express.json(), async(req, res, next) => {
    try{
        const results = await usersService.updateUserName(req);
        
        res.status(200).json(results); 
    }catch(err){
        next(err);
    }
});

router.delete('/:id', async(req, res, next) => {
    try{
        const results = await usersService.deleteUser(req); 
       
        res.status(200).json(results);
    }catch(err){
        console.log(err);
        next(err);
    }
});


module.exports = router;
