const Joi = require('joi');

// validation layer to user

const UserValidator = {
    createUser: (body) => {
        const UserSchema = Joi.object({
            name: Joi.string()
                .pattern(new RegExp('^[a-zA-Z][A-Za-z_0-9]{2,30}$'))
                .required(),
    
            email: Joi.string()
                .email()
                .min(5)
                .max(80)
                .required(),
    
            password: Joi.string()
                .min(8)
                .max(80)
                .required()
         });
    
        return UserSchema.validateAsync(body);
    },

    loginUser: (data) => {
        const UserSchema = Joi.object({
            email: Joi.string()
                .email()
                .min(5)
                .max(80)
                .required(),
            
            password: Joi.string()
                .min(8)
                .max(80)
                .required()
        });
        return UserSchema.validateAsync(data);
    },

    updateUserPasswd: (data) => {
        const UserSchema = Joi.object({
            id: Joi.number()
                .min(1)
                .max(1000)
                .required(),

            email: Joi.string()
                .email()
                .min(5)
                .max(80)
                .required(),
            
            password: Joi.string()
                .min(5)
                .max(80)
                .required()
            
        });
        return UserSchema.validateAsync(data);
    },
    
   
}

module.exports = UserValidator;
