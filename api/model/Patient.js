// app/models/User.js
// grab the mongoose module
var dbObj = require('./../config/mongoconnection');


// define our user model
// module.exports allows us to pass this to other files when it is called

var patientSchema = {
    id: Number,
    pid:Number,
    pfname:String,
    plname:String,
    paddress:String,
    pcontact:String,
    pemail:String
};

var patientSchemaObj = new dbObj.Schema(patientSchema, {collection:"patient", versionKey: false});

var patientObj       = dbObj.model("patient", patientSchemaObj);

module.exports       = patientObj;