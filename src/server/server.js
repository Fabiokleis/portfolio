const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');

require('dotenv').config({path: "/home/urameshi/ports_/portfolio/src/.env"});

app.use('/users', usersRoute);

app.use((err, req, res, next) => {

    res.status(err.statusCode).send(err.message);
});
app.listen(process.env.PORT, (err) => { 
    console.log("connected");
    if(err) throw err;
});
