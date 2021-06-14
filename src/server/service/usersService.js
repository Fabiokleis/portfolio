const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const QueryBuilder = require('../data/dataAccess.js');
const crypto = require('crypto');

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
            throw err;
        }
    }
   
    async login(){
        try{
            const Query = new QueryBuilder(this.data);
            const user = await Query.verifyUserEmail();
            const flag = user['0']?true:false;
            if(flag && Object.values(user['0']).indexOf(this.data.email)){
                const [id, email, password] = Object.values(user['0']);
                const hashValidation = bcrypt
                    .compareSync(this.data.password, password);
                
                if(hashValidation){
                    const token = jwt.sign({id, email}, process.env.TOKEN_SECRET, {expiresIn: '1h'});

                    const auth = {'Authorization': token};
    
                    return auth;
                }
                throw new Error('email or password wrong');

             }

             throw new Error('email or password wrong');
        
        }catch(err){
            throw err;
        }
    }

    async forgot_password(){
        try{
            const tk = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);
            this.data.reset_token = tk;
            this.data.token_date = now;
            const Query = new QueryBuilder(this.data);
            const user = await Query.verifyUserEmail();
            const flag = user['0']?true:false;
            if(flag && Object.values(user['0']).indexOf(this.data.email)){
                const [id, email] = Object.values(user['0']);
                const savedToken = Query.saveToken(id, email);
                return savedToken;                
            }
        

            throw new Error('Error on forgot password, try again!');


        }catch(err){
            throw err;
        }
    }


    async updateUserPasswd(){
        try{    
            const date = new Date();
            this.data.password = bcrypt.hashSync(this.data.password,
                Number(process.env.SALT));

            this.data.date = date;
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
            const user = await Query.getUser();
            const flag = user['0']?true:false;
           if(flag && Object.values(user['0']).indexOf(this.data.email) === 0){  
                const {email, reset_token, token_date} = user['0'];
                const now = new Date();
                if((token_date.getDate() === now.getDate()) && token_date.getHours() > now.getHours()){
                    return {message: "token not expired! continue"};
                }
                throw new Error("token expired, try again!");
            }

            throw new Error("token wrong!");
        }catch(err){
            throw err;
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

