const UserModel = require('../models/userModel');

const UserController = {
    getUsers: (req, res) => {
        UserModel.getAllUsers((error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error fetching users', error });
            }
            return res.status(200).json(results);
        });
    }
};

module.exports = UserController;
