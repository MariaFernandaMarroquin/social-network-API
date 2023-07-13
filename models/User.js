const { Schema, model } = require('mongoose');
const emailValidation = require('mongoose-type-email');

//Initialize model
const User = model('user', userSchema);

//Schema to create User model
const userSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    email: { type: mongoose.SchemaTypes.Email, unique: true, required: true },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'thought',
        }
    ], 
    friends: [
        {

        }
    ]
})

module.exports = User