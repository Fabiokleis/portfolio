const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const QueryBuilder = require('../data/dataAccess.js');


class UsersService {
    constructor(data){
        this.data = data;
    }


    async registerUser(){
        try{
            this.data.password = bcrypt.hashSync(this.data.password,
                Number(process.env.SALT));

            const Query = new QueryBuilder(this.data);
            const userCreated = await Query.registerUser();

            return userCreated;

        }catch(err){
            return throw;
        }
    }
   
    async login(){
        try{
            const Query = new QueryBuilder(this.data);
            const user = await Query.verifyUserEmail();
            const flag = user['0'] ? true : false;
            if(flag && Object.values(user['0']).indexOf(this.data.email) === 1){
                const hashValidation = bcrypt.compareSync(this.data.password,
                    user[0].password);
                
                if(hashValidation){
                    
                    const token = jwt.sign({id, email}, 
                        process.env.TOKEN_SECRET);

                    const auth = {'Authorization': token};
                    return auth;
                }
                throw new Error("email or password incorrect");
            }

            throw new Error("email or password incorrect");
        }catch(err){
            throw err;
        }
    }


    async updateUserPasswd(){
        try{    
            const date = new Date();
            this.data.password = bcrypt.hashSync(this.data.password,
                Number(process.env.SALT));

            this.data.date = date.toISOString();

            const query = new QueryBuilder(this.data);
            const user = await query.updatePassword();

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
    }


    async getUser(){
        try{
            const query = new QueryBuilder(this.data);
            const user = await query.getUserById();

            return user;
        }catch(err){
            return err;
        }
    }

    async deleteUser(){
        try{
            const query = new QueryBuilder(this.data);
            const deletedUser = await query.deleteUserById();

            return deletedUser;
        }catch(err){
            return err;
        }    
    }
}

module.exports = UsersService;

