var appointment = require('./../model/appointment');
var confirmappointment=require('./../model/confirmappointment');
var configuration= require('./../config/config');
var dateFormat = require('dateformat');
var doctor = require('./../model/doctor');
var slots = require('./../model/slots');
var moment = require('moment');

var mongoose = require('mongoose');

module.exports.addAppointment = function(req, res, next)
{
    var now = new Date();
    var createddate=dateFormat(now, "isoDateTime");
    var status = "pending";
    var docid=req.params.id;
     doctor.findOne({'_id': mongoose.Types.ObjectId(docid)}, function(err, doc){
    
       var appt_id=req.body.appointment_time;
         console.log(appt_id);
            slots.findOne({'slotId': appt_id},function(err, slot){
                 console.log(slot); 
                var slot_time=slot.time;
           console.log(slot.time);      
           
   console.log("---------------------------------------------");
     console.log(doc.fname);
       console.log(doc);
     
    console.log("===========patient id" +req.session._id);
    appointment.create({
        
    doc_id: req.params.id,
    doc_fname:doc.fname,
    doc_lname:doc.lname,
    patient_id: req.session._id,
    status: status,
    time_of_booking: createddate,
    date: req.body.date,
    slot_id: req.body.appointment_time,
    appointment_time:slot_time
        
   },function(err,appointment){
        
        if (err)
                res.send(err);
        else
                res.json("appointment has been successfully added");
        
    });
          });
          });
    
}


module.exports.viewAllAppt = function(req, res, next)
{
    appointment.find({'status':'pending'},function(err, allappointments){
        console.log(allappointments);
        res.json(allappointments);
    });
    
}
        

module.exports.cancelAppt = function(req, res, next)
{
    var appt_id=req.params.id;
    console.log("****************************" +appt_id);
    appointment.find({'_id': mongoose.Types.ObjectId(appt_id)}).remove(function(err, appt){
      
      res.json("appt deleted");

   });
    
}


module.exports.confirmAppt=function(req,res,next)
{
    var appt_id=req.params.id;
   var doc_id=req.params.doc_id;
    console.log(appt_id);
    console.log(doc_id);
    
    console.log(mongoose.Types.ObjectId(appt_id));
    
    
    appointment.findOne({'_id': mongoose.Types.ObjectId(appt_id)}, function(err, appt)
    {
        console.log(appt);
        confirmappointment.create({
        
        doc_id: appt.doc_id,
        patient_id:  appt.patient_id,
        date:  appt.date,
        appointment_time: appt.appointment_time

   },function(err,confirmappointment){
        
        if (err)
                res.send(err);
            else
                appt.status='confirmed';
                appt.save();
                res.json("appointment has been successfully confirmed");
    });
    
        
        
});
        
}

module.exports.rejectAppt=function(req,res,next)
{
    var appt_id=req.params.id;
    console.log(appt_id);
    appointment.findOne({'_id': mongoose.Types.ObjectId(appt_id)}, function(err, appt){
console.log(appt);
    appt.status='rejected';
        appt.save();
        res.json("appointment rejected");
    });
    
    
}


module.exports.myAppointment=function(req,res,next)
{

    var patient_id = req.session._id;
    
    console.log(patient_id);
    
    appointment.find({'patient_id': mongoose.Types.ObjectId(patient_id)}, function(err, appointmentDetails){
        console.log(appointmentDetails);
        
        res.send(appointmentDetails);


    });
    
}
    
module.exports.showDocAppt=function(req,res,next)
{

    var doc_id = req.params.id;
    
    console.log(doc_id);
    
    appointment.find({'doc_id': mongoose.Types.ObjectId(doc_id)}, function(err, appointmentDetails){
        console.log(appointmentDetails);
        
        res.send(appointmentDetails);


});



}

module.exports.getAppt = function(req, res, next)
{
    
    var array_of_slots_booked = [];               
    var doc_id = req.params.id;
    console.log(doc_id);
    var date = req.params.date1;
    console.log(date);
    
    var parsed_date = new Date(Date.parse(date)).toISOString();

    
    var now = new Date();
    console.log(now);
    
    var startDate = moment(now, 'YYYY-M-DD HH:mm:ss')
    var endDate = moment(parsed_date, 'YYYY-M-DD HH:mm:ss')
    var secondsDiff = endDate.diff(startDate, 'days')
    //console.log(secondsDiff)
    
    if(secondsDiff >= 7)
    
    {
        console.log("please select date within next 7 days");
        res.send({"sevenDaysError":"true"});
    }
    else if(secondsDiff < 0)
    {
        console.log("select dates after current date");
         res.send({"currentDateError":"true"});
    }
    else
    
    {
        slots.find(function(err, allslots){
            if(err)
                throw err;
            else {

        appointment.find({$and: [{'doc_id':doc_id},{'date':date},{$or:[{'status':"pending"},{'status':"confirmed"}]}]}, function(err, doc_appts){
        console.log("all doc appts" ,doc_appts);
        if(err)
        {
            throw err;
        }
          
        else if(doc_appts.length == 0)
        {
            
                res.send({"allslots":allslots, "error":"false"});
        }
            
        else 
        {
            console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
           console.log(doc_appts);
       
            var len = doc_appts.length;
            
            for(var i=0; i<len; i++)
            {
                    var booked_slot = doc_appts[i].slot_id;
                   
                    console.log(booked_slot);
                    array_of_slots_booked.push(booked_slot);
                    console.log(array_of_slots_booked);
                
            }
            

            
            slots.find({'slotId':{$nin : array_of_slots_booked}}, function(err, data){
            
            console.log(data);
                allslots = data;
                res.send({"allslots":allslots, "error":"false"});
            })

        }

        });
      }
    });}
}