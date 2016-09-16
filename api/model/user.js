var dbObj = require('./../config/mongoconnection');

var userSchema = {
    fname: String,
	lname: String,
    username: String,
    password: String,
	telephone: String,
	address: String,
	email: String,
    accessid:String
};

var userSchemaObj = new dbObj.Schema(userSchema, {collection:"user", versionKey: false});
var userObj       = dbObj.model("user", userSchemaObj);
module.exports       = userObj;

