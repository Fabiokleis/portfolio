const express = require('express');
const router = express.Router();
const usersService = require('../service/usersService');
const UserValidator = require('../validate/userValidation');


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
        const valueObj = await UserValidator.createUser(req.body); 
        const results = await usersService.createUser(valueObj);
        res.status(201).json(results);
    }catch(err){
        next(err);
    }
});

router.put('/:id', express.json(), async(req, res, next) => {
    try{
        const { id } = req.params;
        const { email } = req.body
        const { password } = req.body;
        
        const valueObj = await UserValidator
            .updateUserPasswd({id, email, password});

        const results = await usersService.updateUserPasswd(valueObj);
        
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
