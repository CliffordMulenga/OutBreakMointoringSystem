const db = require('../config/db');

//getting all Patients
const PatientModel = {
    getAllPatients: (callback) => {
        const query = 'SELECT * FROM dimensionpatient';
        db.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    }
};



module.exports = PatientModel;
