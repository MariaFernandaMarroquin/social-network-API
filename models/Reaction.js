const { Schema, Types } = require('mongoose');
const moment = require('moment');


//Only schema for reactions
const reactionSchema = new Schema(
    {
        reactionId: { 
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId()
        },
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

module.exports = reactionSchema;

