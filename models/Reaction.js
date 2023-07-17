const { ObjectId } = require('mongodb');
const { Schema, model } = require('mongoose');
const moment = require('moment');

const Reaction = model('reaction', reactionSchema);

//Only schema for reactions
const reactionSchema = new Schema(
    {
        reactionId: { type: ObjectId, default: true },
        reactionBody: { type: String, required: true, maxLength: 280 },
        username: { type: String, required: true },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                moment(date).format('MMMM Do, YYYY [at] h:mma')
            }
        },
    },
);

module.exports = Reaction;