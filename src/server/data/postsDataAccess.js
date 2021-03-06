const knex = require('../infra/database.js');

const Query = {

    getAllPosts: function({page}){
        const allPosts = knex
            .select(
            'posts.id', 
            'users.name',
            'title', 
            'description',
            'posts.updated_at'
            ).from('posts')
            .join('users', 'users.id', '=', 'posts.user_id')
            .orderBy('posts.updated_at', 'desc')
            .limit(5)
            .offset((page - 1) * 5);
        
        return allPosts;
    },
   
    countAllPosts: function({user_id}){
        const count = knex('posts').count();
        if(user_id) {
            count.where({user_id});
        }

        return count;
    },

    getUserLastPosts: function({user_id, page}){
        const allUserPosts = knex
            .select(
            'name',
            'posts.id',
            'title',
            'description',
            'posts.updated_at'
            ).from('users')
            .where('users.id', '=', user_id)
            .join('posts', 'posts.user_id', '=', user_id)
            .orderBy('posts.updated_at', 'desc')
            .limit(5)
            .offset((page - 1) * 5);
        
        return allUserPosts;
    },

    savePost: function({user_id, title, description}){
        const queryReturn = knex('posts')
            .returning(['id', 'title', 'description', 'created_at'])
            .insert({
                user_id,
                title,
                description
            });
        return queryReturn;
    
    },

    updatePost: function({title, description, user_id, id, updated_at}){
        const queryReturn = knex('posts')
            .returning(['id', 'title', 'description', 'updated_at'])
            .where({
                user_id,
                id
            }).update({
                title,
                description,
                updated_at
            });
        return queryReturn;
    },

    deletePost: function({user_id, id}){
        const queryReturn = knex('posts')
            .where({user_id, id})
            .del();

        return queryReturn;
    },

    verifyPost: function({user_id, id}){
        const queryReturn = knex.select(['id', 'user_id'])
            .from('posts')
            .where({id, user_id});

        return queryReturn;
    }
}

module.exports = Query;
