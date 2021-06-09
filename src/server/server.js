const express = require('express');
const app = express();
const usersRoute = require('./route/usersRoute');
const cors = require('cors');

const coreOpt = {
    origin: 'https://fabiokleis.herokuapp.com'
}

app.use('/users', cors(coreOpt),usersRoute);

app.use((err, req, res, next) => {

    res.status(err.statusCode).send(err.message);
});
app.listen(process.env.PORT, (err) => { 
    console.log("connected");
    if(err) throw err;
});
