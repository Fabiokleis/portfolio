const knex = require('../infra/database.js');

class UserQueryBuilder {
    
    constructor (data){
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.date = data.date;
    }

    getUserById(){
        const queryReturn = knex.select("id", "name", "email")
            .from("users")
            .where({id: this.id});

        return queryReturn;
    }
    
    registerUser(){

        const queryReturn = knex("users")
            .returning(["id", "name", "email"])
            .insert({
                name: this.name, 
                email: this.email,
                password: this.password
            });
        return queryReturn;
    }
    
    verifyUserEmail(){

        const queryReturn = knex.select("id", "email", "password")
            .from("users")
            .where({email: this.email});

        return queryReturn;
    }

    updatePassword(){
        const queryReturn = knex("users")
            .returning(["id", "email"])
            .where({
                id: this.id,
                email: this.email
            })
            .update({
                password: this.password,
                updated_at: this.date
            });


        return queryReturn;
    }
    
    deleteUserById(){
        const queryReturn = knex("users")
            .returning(["id", "name", "email"])
            .where({id: this.id})
            .del();

        return queryReturn;
    }
}

module.exports = UserQueryBuilder;
