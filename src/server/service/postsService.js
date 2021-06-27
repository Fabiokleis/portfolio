const Query = require('../data/postsDataAccess.js');

class PostsService {
    constructor(data){
        this.data = data;
    }
    
    async getAllPosts(){
        try{
            const allPosts = await Query.getAllPosts(this.data);
            const counted = await Query.countAllPosts();
            const count = {'X-Total-Count': counted[0]['count']};
            return {allPosts, count};
        }catch(err){
            throw err;
        }
    }

    async getUserLastPosts(){
        try{
            const allUserPosts = await Query.getUserLastPosts(this.data);
            return allUserPosts;
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
            const verifyIfPostExist = await Query.verifyPost(this.data);
            const flag = verifyIfPostExist['0']?true:false;
            if(flag){
                const updated_at = new Date();
                this.data.updated_at = updated_at;
                const updatedPost = await Query.updatePost(this.data);
                return updatedPost;
            }
            throw new Error("post not exists!");
        }catch(err){
            throw err;
        }
    }

    async deletePost(){
        try{
            const verifyIfPostExist = await Query.verifyPost(this.data);
            const flag = verifyIfPostExist['0']?true:false;
            if(flag){
                const deletePost = await Query.deletePost(this.data);
                return deletePost;
            }
            throw new Error("post not exists!");
        }catch(err){
            throw err;
        }
    }

}

module.exports = PostsService;
