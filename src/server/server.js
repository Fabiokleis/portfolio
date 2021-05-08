const express = require('express');
const app = express();
const postsRoute = require('./route/postsRoute');
const database = require('./infra/database');

app.use('/', postsRoute);

app.listen(3000);
