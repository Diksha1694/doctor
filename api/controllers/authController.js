var loginController = require("./USERController");
//var connection = require('../model/dbConnection');
var jwt    = require('jsonwebtoken');
var config= require('./../config/config');
var dbObj = require('./../config/mongoconnection');
var auth = {} ;

var appt = require('./../model/appointment');
var user = require('./../model/user');
var mongoose = require('mongoose');

auth.authoriseUser = function(req,res,next)
{
/*  console.log(req.session.user);
    console.log(req.session._id);
       console.log(req.session.isAdmin);*/
   console.log("in auth controller==============================");
            if (req.session) 
            {
                var token = req.session.user;

		        if(token)
			     {
 				    //var docid = req.params.id;
                    var decoded = jwt.decode(token, config.secret);

                       
                    var isLoggedIn = true;
                     
                     var id = decoded._doc._id;
                    
                            user.findOne({"_id" : mongoose.Types.ObjectId(id)}, function(err, record){
                            
                                if(err)
                                {
                                    throw err;
                                
                                }
                                else{

                                    //req.u_id=_id;
                                    req.session.user = token;
                                    res.locals.user = token;
                                    req.username = decoded._doc.username;
                                    req.isLoggedIn = isLoggedIn; 

                                  
                           next();
                                }
                            
                            
                            });

                 }
            
                else
                     {
                        console.log("token not available");
                     }
            }
                   else
                     {
                        console.log("session not available");
                     }
                
                           
                           
                       
}
	module.exports = auth;