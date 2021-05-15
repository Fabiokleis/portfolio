const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');

app.use('/users', usersRoute);

app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(500).send("server error");
});


app.listen(3000, (err) => {
    console.log("connected");
    if(err) throw err;
});
