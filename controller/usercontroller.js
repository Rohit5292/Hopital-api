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

module.exports.registerPatient = async (req, res, next) => {
  try {
    const doctorId = req.user.id; // Assuming the authenticated doctor's ID is available in the `id` property of the `req.user` object

    // Check if the doctorId is provided
    if (!doctorId) {
      throw new Error('Doctor ID is required');
    }

    // Check if the doctor with the given ID exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Doctor ID is valid, proceed with patient registration
    req.body.doctor = doctorId;
    const patient = await Patient.create(req.body);
    res.status(200).json({
      success: true,
      message: 'Patient created',
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(500).json({
      success: false,
      message: 'Patient not created. An error occurred.',
      error: err.message, // Include the error message in the response
    });
  }
};

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
  
  