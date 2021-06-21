const Query = require('../data/postsDataAccess.js');

class PostsService {
    constructor(data){
        this.data = data;
    }
    
    async getAllPosts(){
        try{
            const allPosts = await Query.getAllPosts(this.data);
            return allPosts;
        }catch(err){
            throw err;
        }
    }

    async savePost(){
        try{
            const savedPost = await Query.savePost(this.data);
            return savedPost;
        }catch(err){
            throw err;
        }
    }

    async updatePost(){
        try{
            const user = await Query.verifyUserById(this.data);
            if(user){
                const updatedPost = await Query.updatePost(this.data);
            }
            return updatedPost;
        }catch(err){
            throw err;
        }
    }

}

module.exports = PostsService;
