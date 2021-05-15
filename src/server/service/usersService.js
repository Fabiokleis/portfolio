const knex = require('../infra/database.js');
const bcrypt = require('bcrypt');

const usersService = {

    getUsers: () => {
        try{
            const results = knex.select("id", "name", "email")
                .from("users");
            return results;
        }catch(err){
            return err
        }
    },

    getUser: async (req) => {
        const id = req.params.id;
        try{
            const results = knex.select("id","name","email")
                .from("users")
                .where({id});
            return results;
        }catch(err){
            return err;
        }
    },
    
    createUser: (req) => {
        const {name, email, password} = req.body;
        const hashReturn = bcrypt.hashSync(password, 10);

        try{
            const results = knex("users")
                .returning(["id", "name", "email"])
                .insert({name, email, password: hashReturn});

           return results;
        }catch(err){
            return err;
        }
    },

    updateUserName: (req, res) => {
        const id = req.params.id;
        const name = req.body.name;
        const date = new Date();
        try{
            const results = knex("users")
                .returning(["users.*"])
                .where({id})
                .update({
                    name: name,
                    updatedAt: date.toISOString()
                });
            return results;
        }catch(err){
            return err;
        }
    },

    deleteUser: (req) => {
        const id = req.params.id;
        try{
            const results = knex("users")
                .returning(["users.*"])
                .where({id})
                .del()
            
            return results;
        }catch(err){
            return err;
        }
    }


}

module.exports = usersService;
