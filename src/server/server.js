const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');

app.use('/users', usersRoute);

// TODO map all errors
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});


app.listen(3000, (err) => {
    console.log("connected");
    if(err) throw err;
});
