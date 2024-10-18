const db = require('../config/db');

//getting all Patients
const HospitalModel = {
    getAllHospitals: (callback) => {
        const query = 'SELECT * FROM dimensionhospital';
        db.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    }
};



module.exports = HospitalModel;
