const Joi = require('joi');

// validation layer to posts

const PostsValidator = {
    getPost: (body) => {
        const PostSchema = Joi.object({
            id: Joi.number()
                .min(1)
                .max(1000)
                .required(),
        });

        return PostSchema.validateAsync(body);
    },

    createPost: (body) => {
        const PostSchema = Joi.object({
            user_id: Joi.number()
                .min(1)
                .max(1000)
                .required(),

            title: Joi.string()
                .min(5)
                .max(50)
                .required(),
        
            description: Joi.string()
                .required()

           });
    
        return PostSchema.validateAsync(body);
    }
   
}

module.exports = PostsValidator;
