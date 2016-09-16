//var userModel = require('./../models/User.js');
//var userModel = require('./../models/User.js');


var config= require('./../config/config');
var user = require('./../model/user');
var db=require('./../config/mongoconnection');
var bcrypt = require('bcryptjs');
var jwt    = require('jsonwebtoken');
var path = require('path'); 
module.exports.registeruser=function(req, res,next)
{
    console.log('Registering User');
    console.log(req.body);
  user.create({
            fname : req.body.fname,
            lname : req.body.lname,
            username : req.body.username,
            password : req.body.password,
            telephone:req.body.telephone,
            address:req.body.address,
            email:req.body.email, 
            accessid: '0'
            }, function(err, user) {
            if (err)
                res.send(err);
            else
                res.redirect('/');
        });
    
}



module.exports.registeradmin=function(req, res,next)
{
    console.log('Registering admin');
    console.log(req.body);
  user.create({
            fname : req.body.fname,
            lname : req.body.lname,
            username : req.body.username,
            password : req.body.password,
            telephone:req.body.telephone,
            address:req.body.address,
            email:req.body.email, 
            accessid: '1'
            }, function(err, user) {
            if (err)
                res.send(err);
            else
                res.redirect('/');
        });
    
}



module.exports.login=function(req, res,next)
{
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
     console.log(password);
     console.log("hello login");
   user.findOne({"username": username },function(err,records){
       if(records)
       {
           console.log(records.password);
           console.log(config.secret);
           if(records.password==password)
           {
               if(records.accessid=='1')
               {
                   var isAdmin=true;
                   var isUser=false;
           token = jwt.sign(records, config.secret, {
                                expiresIn: 1440 // expires in 24 hours
                            });
                                var decoded = jwt.decode(token, config.secret);
                console.log(decoded);
                          console.log("is ADmin"+ isAdmin);
                           var _id = decoded._doc._id;
                   
               req.session.user = token;
               req.session._id=_id;
               req.session.isAdmin=isAdmin;
               req.isUser=isUser;
                 res.send(req.session.isAdmin);
               }
               else if(records.accessid=='0')
                   
               {
                    var isAdmin=false;
                    var isUser=true;
           token = jwt.sign(records, config.secret, {
                                expiresIn: 1440 // expires in 24 hours
                            });
                                var decoded = jwt.decode(token, config.secret);
                console.log("is ADmin"+ isAdmin);
                           var _id = decoded._doc._id;
                   
               req.session.user = token;
               req.session._id=_id;
               req.session.isAdmin=isAdmin;
               //req.isUser=isUser;
               res.send(req.session.isAdmin);
                   
                   
               }
           }
       }
    
      
   });
    
   
    
}



module.exports.logout=function(req, res,next)
{
    console.log("in logout");
      req.session.reset();
    
}