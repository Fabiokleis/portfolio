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
            return err;
        }
    }
   
    async login(){
        try{
            const Query = new QueryBuilder(this.data);
            const user = await Query.verifyUserEmail();
            
            const flag = user[0] ? true : false;
            
            if(flag && Object.values(user[0]).indexOf(this.data.email) === 1){
                const hashValidation = bcrypt.compareSync(this.data.password,
                    user[0].password);
                if(hashValidation){
                   
                    const token = jwt.sign({id: user[0].id}, 
                        process.env.TOKEN_SECRET);

                    const auth = {'authorization-token': token};
                    return auth;

                }
                return new Error("email or password incorrect");
            }

            return new Error("email or password incorrect");
        }catch(err){
            return err;
        }
    }


    async updateUserPasswd(){
        try{    
            const date = new Date();
            this.data.password = bcrypt.hashSync(this.data.password,
                Number(process.env.SALT));

            this.data.date = date.toISOString();
            const Query = new QueryBuilder(this.data);
            const user = await Query.updatePassword();
            
            return user;

        }catch(err){
            return err;
        }
    }


    async getUser(){
        try{
            const Query = new QueryBuilder(this.data);
            const user = await Query.getUserById();

            return user;
        }catch(err){
            return err;
        }
    }

    async deleteUser(){
        try{
            const Query = new QueryBuilder(this.data);
            const deletedUser = await Query.deleteUserById();

            return deletedUser;
        }catch(err){
            return err;
        }    
    }
}

module.exports = UsersService;

