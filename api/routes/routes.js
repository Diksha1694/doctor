var config     = require('./../config/config');
var doctor = require('./../controllers/doctorController');
var userCtrl  = require('./../controllers/userController');
var appt = require('./../controllers/appointmentController');
var auth = require('./../controllers/authController');
var path = require('path'); 
var http=require('http');
module.exports.set = function(app) 
{
    app.get('/', function(req, res) {
       // res.json({ message: 'hooray! welcome to our api!' }); 
        console.log(__dirname);
         //res.sendFile(path.join(__dirname, './public/templates', 'index.html'));
        
         res.sendFile(path.join(__dirname, './../../app' , 'index.html'));
    });
	
	//app.post('/adddocdetails',doctor.adddoc);
    app.post('/register',userCtrl.registeruser);  
    app.post('/registeradmin',userCtrl.registeradmin); 
   /* app.get('/register', function(req, res) {
        res.sendfile('./public/register.html');
    });*/
    app.post('/login',userCtrl.login);
    app.post('/logout',userCtrl.logout);
	app.post('/adddoc',auth.authoriseUser,doctor.adddoc);
    app.all('/getDocDetails',auth.authoriseUser,doctor.getdetails);
    //app.get('/showdoc',doctor.getdetails);
    app.get('/getDocDetails/:id',auth.authoriseUser,doctor.getdocdetails);
 app.get('/doctors',auth.authoriseUser,doctor.alldoc); 
    app.post('/delete/:id',auth.authoriseUser,doctor.deletedetails);
    app.post('/edit/:id',auth.authoriseUser,doctor.editdetails);
    app.get('/loginuser', function(req, res) {
        res.sendFile(path.join(__dirname, './../../app' , 'login.html'));
    });

app.get('/registeradminn', function(req, res) {
     res.sendFile(path.join(__dirname, './../../app' , 'registeradmin.html'));
    });
    app.get('/registeruser', function(req, res) {
     res.sendFile(path.join(__dirname, './../../app' , 'register.html'));
    });
    app.post('/addAppointment/:id',auth.authoriseUser, appt.addAppointment);
    app.get('/viewAllAppt',auth.authoriseUser, appt.viewAllAppt);
    app.post('/cancelAppt/:id',auth.authoriseUser, appt.cancelAppt);
    app.post('/confirm/:id',auth.authoriseUser, appt.confirmAppt);
    app.post('/reject/:id',auth.authoriseUser, appt.rejectAppt);
    
/*    app.get('/logout', function(req, res) {
        req.session.reset();
        res.sendFile(path.join(__dirname, './../../app' , 'index.html'));
    });*/
    app.get('/getappts/:id/:date1',auth.authoriseUser, appt.getAppt);

    
        app.get('/getappts/:id/:date1',auth.authoriseUser, appt.getAppt);

    app.get('/getappts/:id/:date1',auth.authoriseUser, appt.getAppt);
    app.get('/myAppointment',auth.authoriseUser, appt.myAppointment);
    app.get('/showDocAppt/:id',auth.authoriseUser, appt.showDocAppt);
    
    
}