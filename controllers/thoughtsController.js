const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    // GET all thoughts
    // /api/thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // GET a single thought by its id
    // /api/thoughts/:thoughtId
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found ' });
            }

            res.json(thought);
        } catch {
            res.status(500).json(err);
        }
    },
    // POST to create a new thought
    // /api/thoughts
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.username },
                { $push: { thoughts: thought._id } }
            );

            if (!user){
                return res.status(404).json({ message: 'No user found'});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a thought by its id
    // /api/thoughts/:thoughtId
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE a thought by its id
    // /api/thoughts/:thoughtId
    async deleteUser(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found ' });
            }

            res.json({ message: 'Thought deleted succesfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // POST to create a reaction
    // /api/thoughts/:thoughtId/reactions
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }

            res.json(thought);
        } catch (err) {
            res.json(500).json(err);
        }
    },
    // DELETE a friend from user's list 
    // /api/thoughts/:thoughtId/reactions/:reactionId
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought found ' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}