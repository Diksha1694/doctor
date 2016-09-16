var dbObj = require('./../config/mongoconnection');

var appointmentSchema = {
    doc_id: String,
    doc_fname:String,
    doc_lname:String,
    patient_id: String,
    status: String,
    time_of_booking: Date,
    date: String,
    slot_id: Number,
    appointment_time:String

};



var appointmentSchemaObj = new dbObj.Schema(appointmentSchema, {collection:"appointments", versionKey: false});

var appointmentObj = dbObj.model("appointments", appointmentSchemaObj);

module.exports = appointmentObj;