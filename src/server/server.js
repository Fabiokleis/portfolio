const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');


app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', 'https://fabiokleis.herokuapp.com');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})


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
