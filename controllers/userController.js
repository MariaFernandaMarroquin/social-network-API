const User = require('../models/User');

module.exports = {
    // GET all users 
    // /api/users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // GET a single user and populate thought and friend data
    // /api/users/:userId
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId }).populate('thoughts').populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user found '});
            }

            res.json(user);
        } catch {
            res.status(500).json(err);
        }
    },
    // POST to create a new user
    // /api/users
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // PUT to update a user by its id
    // /api/users/:userId
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found '});
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // DELETE a user by its id
    // /api/users/:userId
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user found '});
            }

            res.json({ message: 'User deleted succesfully'});
        } catch (err) {
            res.status(500).json(err);
        }
    }
}



