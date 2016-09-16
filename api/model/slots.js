var dbObj = require('./../config/mongoconnection');

var slotsSchema = {
   
    slotId: Number,
    time:String

};



var slotsSchemaObj = new dbObj.Schema(slotsSchema, {collection:"slots", versionKey: false});

var slotsObj = dbObj.model("slots", slotsSchemaObj);

module.exports = slotsObj;