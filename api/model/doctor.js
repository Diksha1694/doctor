var dbObj = require('./../config/mongoconnection');

var doctorSchema = {
   
    fname : String,
    lname : String,
    specialization  : String,
    qualification : String,
    telephone: String,
	address: String,
	email: String,
};


var docSchemaObj = new dbObj.Schema(doctorSchema, {collection:"doctors", versionKey: false});

var doctorObj = dbObj.model("doctors", docSchemaObj);

module.exports = doctorObj;

