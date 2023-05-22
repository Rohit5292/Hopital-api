const express = require('express');
const { registerDoctor, registerPatient, createReport, allreports, allreport, login } = require('../controller/usercontroller');
const passport = require('passport');
const router = express.Router();

router.post('/doctors/register', registerDoctor);
router.post('/patients/register',passport.authenticate('jwt',{session:false}), registerPatient);
router.post('/patients/:id/create-report',passport.authenticate('jwt',{session:false}),createReport)
router.get('/patients/:id/all-report',allreports);
router.get('/reports/:status',allreport)
router.post('/login',login)

module.exports = router;
