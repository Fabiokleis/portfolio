const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');
const cors = require('cors');
const options = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    allowerHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization']
}


require('dotenv').config({path: "/home/urameshi/ports_/portfolio/src/.env"});


app.use('/users', cors(options),usersRoute);

app.use((err, req, res, next) => {
    let msg = {};
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
