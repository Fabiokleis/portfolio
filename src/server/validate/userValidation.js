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

    updateUserPasswd: (data) => {
        const UserSchema = Joi.object({
            id: Joi.string()
                .pattern(new RegExp('^[1-9][0-9]{0,5}$'))
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
