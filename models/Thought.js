const { Schema, model } = require('mongoose');
const moment = require('moment');

//Initialize model 
const Thought = model('thought', thoughtSchema);

//Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, minLength: 1, maxLength: 280, required: true },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                moment(date).format('MMMM Do, YYYY [at] h:mma')
            }
        },
        username: { type: String, required: true },
        reactions
    }
)