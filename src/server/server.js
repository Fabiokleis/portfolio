const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');

require('dotenv').config({path: "/home/urameshi/ports_/portfolio/src/.env"});

app.use('/users', usersRoute);

app.use((err, req, res, next) => {
    res.status(err.statusCode).json(err);
});

app.listen(process.env.PORT, (err) => { 
    console.log("connected, running on ", process.env.PORT);
    if(err) throw err;
});
