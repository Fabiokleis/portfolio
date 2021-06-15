const express = require('express');
const router = express.Router();
const UsersService = require('../service/usersService');
const mailConfig = require('../service/configMail.js');
const UserValidator = require('../validate/userValidation');
const auth = require('../service/authService');
const ejs = require('ejs');


router.get('/', express.urlencoded({extended: true}), async(req, res, next) => {
    try{
        const valueObj = await UserValidator.getUser(req.query);
        const userService = new UsersService(valueObj);
        const results = await userService.getUser(); 
        res.status(200).json(results); 
    }catch(err){
        err.statusCode = 404;
        next(err);
    }
});

router.post('/', express.json(), async(req, res, next) => { 
    try{
        const valueObj = await UserValidator.createUser(req.body);
        const userService = new UsersService(valueObj);
        const results = await userService.registerUser();
        res.status(201).json(results);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.post('/login', express.json(), async(req, res, next) => {
    try{
        const valueObj = await UserValidator.loginUser(req.body);
        const userService = new UsersService(valueObj);
        const results = await userService.login();
        res.header(results);
        res.status(200).json({message: "User logged!"});
        
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.post('/forgot_password', express.json(), async(req, res, next) => {
    try {
        const valueObj = await UserValidator.forgot_password(req.body);
        const userService = new UsersService(valueObj);
        const results = await userService.forgot_password();
        const transporter = mailConfig.transporter;
        ejs.renderFile(__dirname + '/templates/forgot_pwd.ejs', 
            {results}, (err, data) => {
                if(err){
                    console.log(err);
                }else{
                    const conf = mailConfig.setMailOpt(data, results['0'].email);

                    transporter.sendMail(conf, (err, data) => {
                        if(err) {
                            console.log(err);
                        }else{
                            res.status(200).json({message: "link has send to email!"})
                            console.log('Email send successfully!');
                        }
                    });
                }

        });

    }catch(err){
        err.statusCode = 404;
        next(err);
    }

})


router.put('/', express.json(), async(req, res, next) => {
    try{
        console.log(req.body);
        const valueObj = await UserValidator
            .updateUserPasswd(req.body);
       
        const userService = new UsersService(valueObj);
        const results = await userService.updateUserPasswd();
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
        const userService = new UsersService(value);
        const results = await userService.deleteUser();
             
        
        res.status(200).json(results);
    
    }catch(err){
        err.statusCode = 404;
        next(err);
    }
});


module.exports = router;
