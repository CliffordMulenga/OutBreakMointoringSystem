const db = require('../config/db');

//getting all Patients
const FactModel = {
    getAllFacts: (callback) => {
        const query = 'SELECT * FROM fact_disease_occurrence';
        db.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    }
};



module.exports = FactModel;
