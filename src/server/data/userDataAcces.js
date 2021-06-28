const knex = require('../infra/database.js');

const Query = {

    getUser: function(id){
        const queryReturn = knex.select(["reset_token", "token_date"])
            .from("users")
            .where({id});

        return queryReturn;
    },
    
    registerUser: function(name, email, password){

        const queryReturn = knex("users")
            .returning(["id", "name", "email"])
            .insert({
                name,
                email,
                password
            });
        return queryReturn;
    },
    
    verifyUserEmail: function(email){

        const queryReturn = knex.select("id", "name", "email", "password", "bio")
            .from("users")
            .where({email});
        return queryReturn;
    },

    subscribeUserEmail: function(email){
        const queryReturn = knex('subscribedemails')
            .returning('email')
            .insert({email});
        return queryReturn;
    },

    saveToken: function(id, email, reset_token, token_date){
        const queryReturn = knex("users")
            .returning(["id", "name", "email", "reset_token", "token_date"])
            .where({
                id,
                email
            })
            .update({
                reset_token,
                token_date
            });

        return queryReturn;
    },

    updatePassword: function(id, email, password, reset_token, token_date, date){
        const queryReturn = knex("users")
            .returning(["name", "email"])
            .where({
                id,
                email
            })
            .update({
                password,
                updated_at: date
            });


        return queryReturn;
    },
    
    saveUserBio: function({id, bio, date}){
        const queryReturn = knex("users")
            .returning("bio")
            .where({id})
            .update({bio, updated_at: date});

        return queryReturn;
            
    },

    saveImg: function({user_id, filename, filepath, mimetype, size}){
        const queryReturn = knex("profile_images")
            .returning(["user_id","filename", "mimetype", "size"])
            .insert({
                user_id,
                filename,
                filepath,
                mimetype,
                size
            });

        return queryReturn;
    },
    
    getFilename: function({user_id, filename}){
        const queryReturn = knex.select("filename")
            .from("profile_images")
            .where({user_id, filename});

        return queryReturn;
    },

    deleteUserById: function(id){
        const queryReturn = knex("users")
            .returning(["id", "name", "email"])
            .where({id})
            .del();

        return queryReturn;
    }
}

module.exports = Query;
