const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    reports:[
        {
            status:{
                type:String,
                required:true,
                enum:["Negative", "Travelled-Quarantine", "Symptoms-Quarantine",
                    "Positive-Admit"]
            },
            date : {
                type:Date,
                required:true
            }
        },
    ],
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'doctor',
        required:true
    }
})
const Patient= new mongoose.model('patient',patientSchema);
module.exports= Patient