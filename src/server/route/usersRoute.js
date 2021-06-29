const express = require('express');
const router = express.Router();
const path = require('path');
const UsersService = require('../service/usersService');
const mailConfig = require('../service/configMail');
const UserValidator = require('../validate/userValidation');
const auth = require('../service/authService');
const ejs = require('ejs');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, __dirname+'/uploads/')
    },
    
    filename: function (req, file, cb){
        cb(null, req.user.id + "_" + file.originalname)
    }

});

const fileFilter = function (req, file, cb){
    const allowedMimeTypes = ['image/jpeg', 'image/png'];
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null, true);
    }else{
        cb({
            succes: false,
            message: 'Invalid file type. Only jpg, png files are allowed.'
        });
    }
}
const limits = {fileSize: 3 * 1024 * 1024};

const upload = multer({storage, limits});

router.get('/image', express.urlencoded({extended: true}), 
    async(req, res, next) => {
        try{
            const {user_id, filename} = req.query;
            const userService = new UsersService({user_id, filename});
            const results = await userService.getFilename();
            const fullPath = path.join(__dirname, '/uploads/' + results);
            res.status(200).sendFile(fullPath);
        }catch(err){
            err.statusCode = 400;
            next(err);
        }
});

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

router.post('/image', auth, upload.single('img'), async(req, res, next) => {
    try{
        const {filename, mimetype, size} = req.file;
        const filepath = req.file.path;
        const user_id = req.user.id;
        const data = {user_id, filename, filepath, mimetype, size};
        const userService = new UsersService(data);
        const results = await userService.saveImg();
        
        res.status(201).json(results);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.post('/subscribe_email', express.json(), async(req, res, next) => {
    try{
        const valueObj = await UserValidator.validateEmail(req.body);
        const userService = new UsersService(valueObj);
        const results = await userService.subscribeEmail();
        res.status(200).json(results);
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
        const template = await ejs.renderFile(__dirname + '/templates/forgot_pwd.ejs',
            {results}, {async: true});

        const transporter = mailConfig.transporter;
        const conf = mailConfig.setMailOpt(template, results['0'].email);
        const info = await transporter.sendMail(conf);

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

router.put('/image', auth, express.urlencoded({extended: true}), upload.single('img'), async(req, res, next) => {
    try{
        fs.unlink(path.join(__dirname, '/uploads/',req.query.filename), (err) => {
            if (err) throw err;
        });
        const {filename, mimetype, size} = req.file;
        const filepath = req.file.path;
        const user_id = req.user.id;
        const data = {user_id, filename, filepath, mimetype, size};
        const userService = new UsersService(data);
        const results = await userService.updateImg();
        res.status(200).json(results);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});


router.put('/bio', auth, express.json(), async(req, res, next) => {
    try{
        const id = req.user.id;
        const bio = req.body.bio;
        const data = {id, bio};
        const valueObj = await UserValidator.userBio(data);
        const userService = new UsersService(valueObj)
        const results = await userService.saveUserBio();
        res.status(201).json(results);
    }catch(err){
        err.statusCode = 400;
        next(err);
    }
});

router.put('/new_password', express.json(), async(req, res, next) => {
    try{
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
