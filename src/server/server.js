const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');

require('dotenv').config({path: "/home/urameshi/ports_/portfolio/src/.env"});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');
    res.header('Access-Control-Expose-Headers', 'Content-Type, Authorization, Origin');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    
    next();
});



app.use('/users', usersRoute);

app.use((err, req, res, next) => {
    let msg = {};
    console.log(err);
    if(err.detail){
        msg.message = err.detail;
    }else if(err.details){
        msg.message = err.details[0].message;
    }else if(err.message){
        msg.message = err.message;
    }
 
    res.status(err.statusCode).json(msg);
});

app.listen(process.env.PORT, (err) => { 
    console.log("connected, running on ", process.env.PORT);
    if(err) throw err;
});
