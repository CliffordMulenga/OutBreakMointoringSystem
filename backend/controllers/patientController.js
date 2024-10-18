const PatientModel = require('../models/patientModel');

const PatientController = {
    getPatients: (req, res) => {
        PatientModel.getAllPatients((error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error fetching patients data', error });
            }
            return res.status(200).json(results);
        });
    }
};

module.exports = PatientController;