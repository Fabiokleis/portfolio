const knex = require('../infra/database.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const usersService = {

    getUser: (data) => {
        const { id } = data;
        try{
            const results = knex.select("id","name","email")
                .from("users")
                .where({id});

            return results;
        }catch(err){
            return err;
        }
    },
    
    registerUser: async (req) => {

        const {name, email, password} = req;
        const hashReturn = bcrypt.hashSync(password, 
            Number(process.env.SALT));

        try{
            const results = await knex("users")
                .returning(["id", "name", "email"])
                .insert({name, email, password: hashReturn});

           return results;
        }catch(err){
            return err;
        }
    },

    login: async (data) => {
        const { email, password } = data;
        try{
                        
            const queryPass = await knex.select("password", "id")
                 .from("users")
                 .where({email});
                   
            if(queryPass[0]){
                const id = queryPass[0].id;
                const dbPass = queryPass[0].password;

                const hashValidate = bcrypt.compareSync(password, dbPass);        
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
        const { id, email, password } = data;
        const date = new Date();
        try{
            
            const hashReturn = bcrypt.hashSync(password,
                Number(process.env.SALT));
            
            const updatedPassword = await knex("users")
                 .returning(["id", "email"])
                 .where({id, email})
                 .update({
                     password: hashReturn,
                     updated_at: date.toISOString()
                  });
                        
            return updatedPassword;
            
        }catch(err){
            return err;
        }
    },

    deleteUser: async (data) => {
        const { id } = data;
        try{
            const results = await knex("users")
                .returning(["id", "name", "email"])
                .where({id})
                .del();
            
            return results;
        }catch(err){
            return err;
        }
    }
}

module.exports = usersService;
