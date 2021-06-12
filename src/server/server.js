const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');
const cors = require('cors');
const options = {
    'origin': 'https://fabiokleis.herokuapp.com',
    'optionsSucessStatus': 200,
    'methods': ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE'],
    'preflightContinue': true,
    'allowedHeaders': ['Content-Type', 'Authorization'],
    'exposedHeaders': ['Content-Type', 'Authorization']
}

app.use(cors(options));
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
