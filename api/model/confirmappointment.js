var dbObj = require('./../config/mongoconnection');


var confirmappointmentSchema = {
    doc_id: String,
    patient_id: String,
    date: Date,
    appointment_time: String,

};



var confirmappointmentSchemaObj = new dbObj.Schema(confirmappointmentSchema, {collection:"confirmappointments", versionKey: false});

var confirmappointmentObj = dbObj.model("confirmappointments", confirmappointmentSchemaObj);

module.exports = confirmappointmentObj;