const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Query = require('../data/userDataAcces.js');
const crypto = require('crypto');
class UsersService {
    constructor(data){
        this.data = data;
    }

    async registerUser(){

        try{
            this.data.password = bcrypt.hashSync(this.data.password,
               Number(process.env.SALT));

            const userCreated = await Query.registerUser(
                    this.data.name,
                    this.data.email,
                    this.data.password
            );

            return userCreated;
        }catch(err){
            throw err;
        }
    }
   
    async login(){
        try{
            const user = await Query.verifyUserEmail(this.data.email);
            const flag = user['0']?true:false;
            if(flag && Object.values(user['0']).indexOf(this.data.email)){
               const [id, name, email, password, bio] = Object.values(user['0']);
                const hashValidation = bcrypt.compareSync(this.data.password, password);
                if(hashValidation){
                    const usefile = await Query.verifyUserImg(id);
                    const prof = usefile['0']?true:false;
                    
                    const [filename] = prof?Object.values(usefile['0']): [];
                    const token = jwt.sign({id, name, email, bio, filename}, process.env.TOKEN_SECRET, {expiresIn: '1h'});

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
            const tk = crypto.randomBytes(10).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);
            this.data.reset_token = tk;
            this.data.token_date = now;
            const user = await Query.verifyUserEmail(this.data.email);
            const flag = user['0']?true:false;
            if(flag && Object.values(user['0']).indexOf(this.data.email)){
                const [id, email] = Object.values(user['0']);
                const savedToken = Query.saveToken(
                    id, 
                    email,
                    this.data.reset_token,
                    this.data.token_date
                );

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
            const user = await Query.updatePassword(
                this.data.id,
                this.data.email,
                this.data.password,
                this.data.reset_token,
                this.data.token_date,
                this.data.date
            );
            return user;

        }catch(err){
            throw err;
        }
    }


    async getUser(){
        try{
            const user = await Query.getUser(this.data.id);
            const flag = user['0']?true:false;
            if(flag){
                const {reset_token, token_date} = user['0'];
                const now = new Date();
                if((token_date.getDate() === now.getDate()) && token_date.getHours() > now.getHours()){
                    return {message: "Token date not expired, continue and recreate your password!"};
                }
                throw new Error("token expired, try again!");
            }

            throw new Error("token wrong!");
        }catch(err){
            throw err;
        }
    }

    async subscribeEmail(){
        try{
            const subscribed = await Query.subscribeUserEmail(this.data.email);
            return subscribed;
        }catch(err){
            throw err;
        }


    }

    async saveUserBio(){
        try{
            this.data.date = new Date();
            const savedBio = await Query.saveUserBio(this.data);
            return savedBio;
        }catch(err){
            throw err;
        }
    }

    async saveImg(){
        try{
            const savedImg = await Query.saveImg(this.data);
            return savedImg;
        }catch(err){
            throw err;
        }
    }
   
    async updateImg(){
        try{
            const updatedImg = await Query.updateImg(this.data);
            return updatedImg;
        }catch(err){
            throw err;
        }
    }

    async getFilename(){
        try{
            const filename_db = await Query.getFilename(this.data);
            const flag = filename_db['0']?true:false;
            if(flag){
                return filename_db['0'].filename;
            }
            throw new Error("Image does not exist!");
        }catch(err){
            throw err;
        }
    }


    async deleteUser(){
        try{
            const deletedUser = await Query.deleteUserById(this.id);

            return deletedUser;
        }catch(err){
            return err;
        }    
    }
}

module.exports = UsersService;


