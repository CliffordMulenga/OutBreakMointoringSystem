const db = require('../config/db');

//getting all users
const UserModel = {
    getAllUsers: (callback) => {
        const query = 'SELECT * FROM users';
        db.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    }
};



module.exports = UserModel;
