const jwt = require('jsonwebtoken');

module.exports = authUser = (req, res, next) => {
    try{    
        const token = req.header('authorization-token');
        const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = userVerified;
        next();
    }catch(err){
        next(err)
    }
}
