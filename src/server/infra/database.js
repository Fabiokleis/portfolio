const mongoose = require('mongoose');
const URL_ = "mongodb://127.0.0.1:27017/"; // substituir por env var

mongoose.connect(URL_, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('we are connected!');
});

module.exports = db;