const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');
const cors = require('cors');
const options = {
    origin: 'https://https://fabiokleis.herokuapp.com',
    optionsSuccesStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization']
}

app.use('/users', cors(options), usersRoute);

app.use((err, req, res, next) => {
    let msg = {};
    if(err.detail){
        msg.message = err.detail;
    }else if(err.details){
        msg.message = err.details[0].message;
    }else if(err.message){
        msg.message = err.message
    }

    res.status(err.statusCode).json(err);
});

app.listen(process.env.PORT, (err) => { 
    console.log("connected");
    if(err) throw err;
});
