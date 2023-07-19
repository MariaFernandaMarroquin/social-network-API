const { Schema, model } = require('mongoose');
const moment = require('moment');

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
        reactions: [
            {
                tytpe: Schema.Types.ObjectId,
                ref: 'reaction',
            },
        ],

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Create virtual property to retrieve the length of the thought's reactions. 
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

//Initialize model 
const Thought = model('thought', thoughtSchema);

module.exports = Thought;