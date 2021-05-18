const express = require('express');
const router = express.Router();
const usersService = require('../service/usersService');
const UserValidator = require('../validate/userValidation');
const auth = require('../service/authService');


router.get('/', auth, async(req, res, next) => {
    try{
        const { id } = req.user;
        const valueObj = await UserValidator.getUser({id});
        const results = await usersService.getUser(valueObj);
        
        res.status(200).json(results); 
    }catch(err){
        err.statusCode = 404;
        next(err);
    }
});

router.post('/', express.json(), async(req, res, next) => { 
    try{
        const valueObj = await UserValidator.createUser(req.body); 
        const results = await usersService.registerUser(valueObj);
        res.status(201).send(results);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.post('/login', express.json(), async(req, res, next) => {
    try{
        const valueObj = await UserValidator.loginUser(req.body);
        const results = await usersService.login(valueObj);
   
        if(results["authorization-token"]){
            res.header(results);
            res.status(200).send("User logged!");
        }
        results.statusCode = 400;
        next(results);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.put('/', express.json(), auth, async(req, res, next) => {
    try{
        const { id } = req.user;
        const { email } = req.body;
        const { password } = req.body;

        const valueObj = await UserValidator
            .updateUserPasswd({id, email, password});
       
        const results = await usersService.updateUserPasswd(valueObj);
        res.status(200).json(results); 
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.delete('/', auth, async(req, res, next) => {
    try{
        const { id } = req.user;
        const value = await UserValidator.deleteUser({id});
        const results = await usersService.deleteUser(value);
             
        
        res.status(200).json(results);
    
    }catch(err){
        err.statusCode = 404;
        next(err);
    }
});


module.exports = router;
