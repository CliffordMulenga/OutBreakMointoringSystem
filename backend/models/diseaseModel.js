const db = require('../config/db');

//getting all Patients
const DiseaseModel = {
    getAllDiseases: (callback) => {
        const query = 'SELECT * FROM dimensiondisease';
        db.query(query, (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    }
};


// const aggregateDiseaseCasesByHospitalAndMonth = (callback) => {
//     const query = `
//       SELECT 
//           dH.hospital_name, 
//           MONTH(fdo.date_of_occurrence) AS month, 
//           SUM(fdo.number_of_cases) AS total_cases
//       FROM 
//           fact_disease_occurrence fdo
//       JOIN 
//           dimensionHospital dH ON fdo.hospital_id = dH.hospital_id
//       GROUP BY 
//           dH.hospital_name, 
//           MONTH(fdo.date_of_occurrence)
//       ORDER BY 
//           total_cases DESC;
//     `;
  
//     db.query(query, (error, results) => {
//         if (error) {
//             return callback(error, null);
//         }
//         return callback(null, results);
//     });
//   };



module.exports = {DiseaseModel};
