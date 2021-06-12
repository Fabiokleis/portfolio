const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://fabiokleis.herokuapp.com');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin');
    res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, PUT, DELETE');
    
    next();
});

app.use('/users', usersRoute);

app.use((err, req, res, next) => {
    let msg = {};
    if(err.detail){
        msg.message = err.detail;
    }else if(err.details){
        msg.message = err.details[0].message;
    }else if(err.message){
        msg.message = err.message
    }

    res.status(err.statusCode).json(msg);
});

app.listen(process.env.PORT, (err) => { 
    console.log("connected");
    if(err) throw err;
});
