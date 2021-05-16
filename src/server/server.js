const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');

require('dotenv').config();

app.use('/users', usersRoute);



// TODO map all errors
app.use((err, req, res, next) => {

    res.status(err.statusCode).send(err.message);
});


app.listen(process.env.PORT, (err) => { 
    console.log("connected");
    if(err) throw err;
});
