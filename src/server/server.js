const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');
const cors = require('cors');

const corsOpt = {
    origin: 'https://fabiokleis.herokuapp.com',
    optionsSuccessStatus: 200
}

app.use('/users', cors(corsOpt),usersRoute);

app.use((err, req, res, next) => {

    res.status(err.statusCode).send(err.message);
});
app.listen(process.env.PORT, (err) => { 
    console.log("connected");
    if(err) throw err;
});
