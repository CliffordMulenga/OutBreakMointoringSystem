const HospitalModel = require('../models/hospitalModel');

const HospitalController = {
    getHospitals: (req, res) => {
        HospitalModel.getAllHospitals((error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error fetching Hospital data', error });
            }
            return res.status(200).json(results);
        });
    }
};


module.exports = HospitalController;