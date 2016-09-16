var appointment = require('./../model/appointment');
var confirmappointment=require('./../model/confirmappointment');
var configuration= require('./../config/config');
var dateFormat = require('dateformat');

module.exports.addAppointment = function(req, res, next)
{
   confirmappointment.create({
        
    doc_id: req.params.id,
    patient_id: req.session._id,
    date: req.body.date,
    appointment_time: req.body.appointment_time
        
   },function(err,appointment){
        
        if (err)
                res.send(err);
            else
                res.send("appointment has been successfully added");
        
    });
    
}

module.exports.getAllAppt=function(req, res, next)
{
    
    confirmappointment.find(function(err, allconfirmedappointments){
        
        console.log(allconfirmedappointments);
        res.json(allconfirmedappointments);
    });
    
    
}