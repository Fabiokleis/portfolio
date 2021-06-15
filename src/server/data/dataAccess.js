const knex = require('../infra/database.js');

const Query = {

    getUser: function(email, reset_token){
        const queryReturn = knex.select("email", "reset_token", "token_date")
            .from("users")
            .where({email, reset_token});

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

        const queryReturn = knex.select("id", "email", "password")
            .from("users")
            .where({email});
        return queryReturn;
    },

    saveToken: function(id, email, reset_token, token_date){

        const queryReturn = knex("users")
            .returning(["name", "email", "reset_token", "token_date"])
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

    updatePassword: function(email, password, date){
        const queryReturn = knex("users")
            .returning(["id", "email"])
            .where({
                email
            })
            .update({
                password,
                updated_at: date
            });


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
