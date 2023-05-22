const Doctor = require('../model/doctor');
const Patient = require('../model/patient')
const jwt = require('jsonwebtoken');


module.exports.registerDoctor = async (req, res, next) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(200).json({
      success: true,
      message: 'Doctor created',
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Doctor not created. Error occurred.',
    });
  }
};

module.exports.registerPatient= async (req,res,next)=>{
    try{
        req.body.doctor ='646b62d254dc1c0f84896f2c'
        const patient = await Patient.create(req.body)
        res.status(200).json({
            success: true,
            message: 'Patient created',
          });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Patient not created. Error occurred.',
          });
    }
}
module.exports.createReport = async (req, res, next) => {
    try {
      const patient = await Patient.findById(req.params.id);
      req.body.date = Date.now();
      patient.reports.push(req.body);
      patient.save();
      res.status(200).json({
        success: true,
        message: 'Patient Report created',
      });
    } catch (err) {
        console.log(err);
      res.status(500).json({
        success: false,
        message: 'Patient Reports not created. Error occurred.',
      });
    }
  };
  module.exports.allreports = async(req,res,next)=>{
    try{
        const patient = await Patient.findById(req.params.id)
        res.status(200).json({
            success: true,
           reports:patient.reports
          })
    }
    catch(err){
          console.log(err);
          res.status(500).json({
            success: false,
            message: 'error in finding reports. Error occurred.',
          });
  }
}
module.exports.login = async (req, res, next) => {
  try {
    const user = await Doctor.find(req.body);
    if (user.length > 0) {
      const token = jwt.sign({ userId: user[0].id }, "secret");
      res.status(200).json({
        success: true,
        token,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Invalid name or password',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Error in finding doctor.',
    });
  }
};

module.exports.allreport = async (req, res, next) => {
    try {
      const patient = await Patient.find({ reports: { $elemMatch: { status: req.params.status } } });
      res.status(200).json({
        success: true,
        reports: patient,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: 'Error in finding reports. Error occurred.',
      });
    }
  };
  
  