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
    }

}

module.exports = Query;
