const express = require('express');
const router = express.Router();
const db = require('../config/db');
// const UserController = require('../controllers/userController');
const PatientController = require('../controllers/patientController');
const FactController = require('../controllers/factController');
const HospitalController = require('../controllers/hospitalController');
const DiseaseController = require('../controllers/diseaseController');

// Get all table data
router.get('/patients', PatientController.getPatients);
router.get('/diseases', DiseaseController.getDiseases);
router.get('/hospitals', HospitalController.getHospitals);
router.get('/facts', FactController.getFacts);


// Route to get aggregated disease cases by hospital and month
router.get('/disease-cases/aggregation', diseaseController.getAggregatedDiseaseCases);



module.exports = router;
