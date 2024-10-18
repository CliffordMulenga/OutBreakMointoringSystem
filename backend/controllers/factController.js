const FactModel = require('../models/factModel');

const FactController = {
    getFacts: (req, res) => {
        FactModel.getAllFacts((error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error fetching Facts', error });
            }
            return res.status(200).json(results);
        });
    }
};

module.exports = FactController;