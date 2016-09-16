
var doctor = require('./../model/doctor');

var configuration= require('./../config/config');
var appointment = require('./../model/appointment');

var mongoose = require('mongoose');


module.exports.alldoc = function(req, res){
    console.log("in all docs");
   doctor.find(function(err, alldoctors){
       
    console.log(alldoctors);
    
    res.send(alldoctors);
    });
}

module.exports.adddoc = function(req, res, next){

    console.log('doctor details+++++++++++++++++++');
	
	console.log(req.body.qualification);
    
    console.log(req.body);
doctor.create({
            fname : req.body.fname,
            lname : req.body.lname,
            specialization:req.body.specialization,
            qualification:req.body.qualification,
            telephone:req.body.telephone,
            address:req.body.address,
            email:req.body.email

            }, function(err, doctors) {
            if (err)
                res.send(err);
            else
                res.send("doctor details have been successfully added");

           
            
        });
        }


module.exports.getdetails = function(req, res, next)
{

    console.log("get all doc details");
    console.log(req.isLoggedIn);
    console.log(req.session.isAdmin);
    var patient_id=req.session._id;
    console.log(patient_id);
    
/*    appointment.find({'patient_id': mongoose.Types.ObjectId(patient_id)}, function(err, appointmentDetails){
        console.log(appointmentDetails);


    });*/
    
    
    
    doctor.find(function(err, alldoctors){
       
    console.log(alldoctors);
    //res.render('doctors',{alldoctors:alldoctors});
    res.status(200).send(alldoctors);
    
    });

}
module.exports.getdocdetails = function(req, res, next)
{
    console.log("get 1 doc details");
    var docid = req.params.id;
    console.log(docid);

    doctor.findOne({'_id': mongoose.Types.ObjectId(docid)}, function(err, doc){
    res.json(doc);
    })
}
/*module.exports.editdetails = function(req, res, next)
{
    console.log("edit doc details");
    console.log("get 1 doc details");
    var docid = req.params.id;
    console.log(docid);
   doctor.findOne({'_id': mongoose.Types.ObjectId(docid)}, function(err, doc){
   }
  
}*/
module.exports.deletedetails = function(req, res, next)
{
    console.log("delete doc details");
   
    var docid = req.params.id;
    console.log(docid);
    
  
  doctor.find({'_id': mongoose.Types.ObjectId(docid)}).remove(function(err, doc){
      
      res.send("doc deleted");

   });
    
    
}


module.exports.editdetails = function(req, res, next)
{
    console.log("edit doc details");
    
    var docid = req.params.id;
    console.log(docid);
    db.people.update(
   { name: "Andy" },
   {
      name: "Andy",
      rating: 1,
      score: 1
   },
   { upsert: true }
)
  
  doctor.update({'_id': mongoose.Types.ObjectId(docid)}).remove(function(err, doc){
      
      res.send("doc deleted");

   });
    
    
}


    
    



