const knex = require('../infra/database.js');

const Query = {

    getAllPosts: function({page}){
        const queryReturn = knex('posts')
            .limit(5)
            .offset((page - 1) * 5);
            
        return queryReturn;
    },

    savePost: function({user_id, title, description}){
        const queryReturn = knex('posts')
            .returning(['id', 'title', 'description'])
            .insert({
                user_id,
                title,
                description
            });
        return queryReturn;
    },

    updatePost: function({title, description, user_id, id}){
        const queryReturn = knex('posts')
            .returning(['id', 'title', 'description'])
            .where({
                user_id,
                id
            }).update({
                title,
                description
            });
        return queryReturn;
    },

    verifyUserById: function({user_id}){
        const queryReturn = knex.select(['name', 'email'])
            .where({id});
        
        return queryReturn;
    }

}

module.exports = Query;
