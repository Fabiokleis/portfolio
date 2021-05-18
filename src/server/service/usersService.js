const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const QueryBuilder = require('../data/dataAccess.js');

const usersService = {

    getUser: async (data) => {
        try{
            const query = new QueryBuilder(data);
            const results = await query.getUserById();
            return results;
        }catch(err){
            return err;
        }
    },
    
    registerUser: async (data) => {

        data.password = hashReturn = bcrypt.hashSync(data.password, 
            Number(process.env.SALT));
        
        try{
            const query = new QueryBuilder(data);
            const results = await query.registerUser();
            
            return results;
        }catch(err){
            return err;
        }
    },

    login: async (data) => {
      
        try{
                        
            const query = new QueryBuilder(data);
            const queryPass = await query.verifyUserEmail();
            
            if(queryPass[0]){
                const id = queryPass[0].id;
                const dbPass = queryPass[0].password;

                const hashValidate = bcrypt.compareSync(data.password, dbPass);        
                if(hashValidate){
                    const token = jwt
                         .sign({id}, process.env.TOKEN_SECRET);
                            
                    const results = {'authorization-token': token};
                    return results;
                }
                return new Error("email or password incorrect");
            }

            return new Error("email or password incorrect");
            
        }catch(err){
            return err;
        }

    },

    updateUserPasswd: async (data) => {
        try{
            const date = new Date();                   
            data.password = bcrypt.hashSync(data.password,
                Number(process.env.SALT));

            data.date = date.toISOString;

            const query = new QueryBuilder(data);
            const updatedPassword = await query.updatePassword();

                                  
            return updatedPassword;
            
        }catch(err){
            return err;
        }
    },

    deleteUser: async (data) => {
      
        try{
            const query = new QueryBuilder(data);
            const results = await query.deleteUserById();
            
            return results;
        }catch(err){
            return err;
        }
    }
}

module.exports = usersService;
