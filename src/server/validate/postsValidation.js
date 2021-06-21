const Joi = require('joi');

// validation layer to posts

const PostsValidator = {
    validatePage: (query) => {
        const PostSchema = Joi.object({
            page: Joi.number()
                .min(1)
                .max(1000)
                .required()
        });

        return PostSchema.validateAsync(query);
    },

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
    },
    
    updatePost: (body) => {
        const PostSchema = Joi.object({
                   
            title: Joi.string()
               .min(5)
               .max(50)
               .required(),

            description: Joi.string()
                .required(),

            user_id: Joi.number()
                .min(1)
                .max(1000)
                .required(),

            id: Joi.number()
               .min(1)
               .max(1000)
               .required()

        });
        
        return PostSchema.validateAsync(body);
    },

    deletePost: (body) => {
        const PostSchema = Joi.object({
            user_id: Joi.number()
                .min(1)
                .max(1000)
                .required(),

            id: Joi.number()
                .min(1)
                .max(1000)
                .required()
        });

        return PostSchema.validateAsync(body);
    }
   
}

module.exports = PostsValidator;
