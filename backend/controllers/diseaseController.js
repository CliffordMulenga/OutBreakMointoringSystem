const DiseaseModel = require('../models/diseaseModel');

const DiseaseController = {
    getDiseases: (req, res) => {
        DiseaseModel.getAllDiseases((error, results) => {
            if (error) {
                return res.status(500).json({ message: 'Error fetching dieseaes data', error });
            }
            return res.status(200).json(results);
        });
    }
};

// const getAggregatedDiseaseCases = async (req, res) => {
//     try {
//       const data = await diseaseModel.aggregateDiseaseCasesByHospitalAndMonth();
//       res.status(200).json(data); 
//     } catch (error) {
//       res.status(500).json({ message: 'Error fetching data', error });
//     }
//   };

module.exports = DiseaseController;