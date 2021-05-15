const knex = require('../infra/database.js');

const usersService = {

    getUsers: async (req, res, next) => {
        try{
            const results = await knex.select("id", "name", "email")
                .from("users");
            res.status(200).json(results);

        }catch(err){
            next(err);
        }
    },

    getUser: async (req, res, next) => {
        const id = req.params.id;
        try{
            const results = await knex.select("id","name","email")
                .from("users")
                .where({id});

            res.status(200).json(results);
        }catch(err){
            next(err);
        }
    },
    
    createUser: async (req, res, next) => {
        const {name, email, password} = req.body;
        try{
            const results = await knex("users")
                .returning(["id", "name", "email"])
                .insert({name, email, password});

            res.status(201).json(results);

        }catch(err){
            next(err);
        }
    },

    updateUserName: async (req, res, next) => {
        const id = req.params.id;
        const name = req.body.name;
        const date = new Date();
        try{
            const results = await knex("users")
                .returning(["id", "name", "email"])
                .where({id})
                .update({
                    name: name,
                    updatedAt: date.toISOString()
                });
            res.status(200).json(results);
        }catch(err){
            next(err);
        }
    },

    deleteUser: async (req, res, next) => {
        const id = req.params.id;
        try{
            const results = await knex("users")
                .returning(["users.*"])
                .where({id})
                .del()

            res.status(200).json(results);
        }catch(err){

            next(err);
        }
    }


}

module.exports = usersService;
