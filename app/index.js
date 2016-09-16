var myapp = angular.module('myapp',['ngRoute', 'ngResource','ui','ui.filters','ngCookies']);
            
      
      
       myapp.config(function($routeProvider) {
        $routeProvider.when('/showusers', {
                templateUrl : '/front.html',
                controller  : 'ShowUserController'
            }).when('/addnewuser', {
                templateUrl : '/addnewuser',
                controller  : 'addnewuserController'
        }).when('/register',{
            controller : 'registerController',
                templateUrl : '/registeruser'
        }).when('/registeradmin',{
            controller : 'registeradminController',
                templateUrl : '/registeradminn'
        }).when('/login', {
                templateUrl : '/login.html',
                controller  : 'loginController'
        }).when('/logout', {
                templateUrl : '/login.html',
                controller  : 'logoutController'
        }).when('/logout1', {
                templateUrl : '/index.html'
        }).when('/showdoc', {
                templateUrl : '/doctors.html',
                controller  : 'showdoctorscontroller'
        }).when('/showappt', {
                templateUrl : '/appointment.html',
                controller  : 'showappointmentcontroller'
        }).when('/doc/:doc_id',{
            templateUrl : '/doc.html',
                controller  : 'doctorscontroller'
        }).when('/addappt/:doc_id/:date1',{
            templateUrl : 'appt.html',
            controller: 'apptcontroller'
        }).when('/rejectappt/:_id',{
            templateUrl : 'appointment.html',
            controller: 'rejectappointment'
        }).when('/confirmappt/:_id',{
            templateUrl : 'appointment.html',
            controller: 'confirmappointment'
        }).when('/myAppointment',{
            templateUrl : 'myAppointment.html',
            controller: 'myAppointment'   
        }).when('/adddoc',{
            templateUrl : 'adddoc.html',
            controller: 'adddoc' 
        }).when('/doctors',{
            templateUrl : 'alldoc.html',
            controller: 'doctors'  
        }).when('/editdoc/:id',{
            templateUrl : 'alldoc.html',
            controller: 'edit'   
        }).when('/showDocAppt/:id',{
            templateUrl : 'docAppointment.html',
            controller: 'showDocAppt'   
        }).
        when('/delete/:id',{
            templateUrl : 'alldoc.html',
            controller: 'delete'   
        }).
        when('/cancelAppt/:id',{
            templateUrl : 'myAppointment.html',
            controller: 'cancelAppt'   
        }).otherwise({
        redirectTo: '/ShowUserController'
      });
    });




    myapp.controller('addnewuserController', function($resource, $scope) {
        $scope.message = 'addnewuser';
        
        $scope.postform = function(){
            
           // alert('heyy');
        
            var rsrc = $resource('/api/users');
            rsrc.save($scope.newuser, function()
            {
                $scope.message = "new user added";
            
            })
        }
});

      
      
      
myapp.controller('registerController', function($resource,$scope) {

              $scope.message = 'register patient';
        
        $scope.postform = function(){
            
          
        
            var rsrc = $resource('/register');
            
            rsrc.save($scope.newuser, function()
            {
                
            $scope.message = "new user added";
             window.location='/#login'
            
            })
  
        }
        
    });
      myapp.controller('registeradminController', function($resource,$scope) {

              $scope.message = 'register admin';
        
        $scope.postform = function(){
            
         
        
            var rsrc = $resource('/registeradmin');
            
            rsrc.save($scope.newuser, function()
            {
                
            $scope.message = "new user added";
             window.location='/#login'
            
            })
  
        }
        
    });      
      
      myapp.controller('loginController', function($resource,$scope,$http,showData) 
    {
          $scope.showData = showData; 
          $scope.showData.status1 =false;
          $scope.showData.status2 =false;
          
          $scope.send = function()
          {
             
            $http.post('/login',$scope.data).success( function(response) {
            $scope.showData.status1 =false;
          $scope.showData.status2 =true; 
            $scope.Admin = response;
              
             if($scope.Admin=='true')
             {
                window.location='/#showappt'
             }
                else{
                     window.location='/#showdoc'
                }
            });
          }
          
    });
        
myapp.controller('logoutController', function($resource,$scope,$http,showData) {
     $http.post('/logout').success( function(response) {
         $scope.showData.status1 =true;
          $scope.showData.status2 =false;
         window.location='/#login'
         
})
    
});


myapp.controller('ssmCtrl',function($scope,showData){

$scope.showData = showData; 
    $scope.showData.status1=true;
        $scope.showData.status2=false;
console.log("status in required controller"+$scope.showData.status);



});


        myapp.controller('showdoctorscontroller', function($resource, $scope,$http){
            var doctors = {};
           
                      /* var rsrc = $resource('/getDocDetails');
                       // $scope.doctors = rsrc.query();
                       var v=rsrc.query();
                       alert(v);*/
                       //console.log(v);
            $http.get('/getDocDetails').success( function(response) {
               
            $scope.doctors = response;
            $scope.data= $scope.doctors[0];
   
            });
           
       
       });

  myapp.controller('showappointmentcontroller', function($resource, $scope,$http){
            var appointment = {};
            $http.get('/viewAllAppt').success( function(response) {
            $scope.appointment = response;
                
           // console.log($scope.appointment[0]._id);
                 $http.get('/getDocDetails').success( function(response) {
                     
                     
                 });
            });
           
       
       });

  myapp.controller('doctorscontroller', function($resource, $scope,$http,$routeParams){
            var doctors = {};
            var id = $routeParams.doc_id;
            $http.get('/getDocDetails/'+id+'').success( function(response) {
            $scope.doctor = response;
            var date1 = $scope.date1;
                
            });
       
        });

        myapp.controller('apptcontroller', function($resource, $scope,$http,$routeParams){
            
            $scope.datefunction = function() {
            
            var dateeee = $scope.date1;
                alert(dateeee);
            
            }
            
            
            var slots = {};
            
            
             var date1 = $scope.date1;
               
            var id = $routeParams.doc_id;
            var date1 = $routeParams.date1;
            $http.get('/getappts/'+id+'/'+date1+'').success( function(response) {
           // $scope.slots = response;

                
                var x = response;
                
                if(response.currentDateError == "true")
                {
                    
                    $scope.message= "Select date after current date";
                }
                else if(response.sevenDaysError == "true")
                {
                    $scope.message= "Please select days within next 7 days";
                }
                else
                
                    {
                            if(response.allslots == ""){
                            
                                $scope.message= "all slots are booked";
                                
                            }
                        else{
                        $scope.slots = response.allslots;


                        $scope.myFunc = function() {

                        var appointment_time = $scope.data;
                        var id = $routeParams.doc_id;
                var date = $routeParams.date1;



                $http.post('/addAppointment/'+id+'', {appointment_time:appointment_time, date:date}).success( function(response) {
                    $scope.message = response;
        } );

            }      }} });});

    myapp.controller('rejectappointment', function($resource, $scope,$http,$routeParams){
      console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiii");
      var doc_id=$routeParams.doc_id;
      var appt_id=$routeParams._id;
      console.log(doc_id);
       console.log(appt_id);
      $http.post('/reject/'+appt_id).success( function(response)        {
       
         window.location='/#showappt'
      })
  });
      
      
  myapp.controller('confirmappointment', function($resource, $scope,$http,$routeParams,$cookies){
         console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiii confirm");
      
       
      
      var doc_id=$routeParams.doc_id;
      var appt_id=$routeParams._id;
       console.log(doc_id);
       console.log(appt_id);
      $http.post('/confirm/'+appt_id).success( function(response) {
                   console.log("hello confirm");
          //alert("appoitment confirmed");
          window.location='/#showappt'
          
      })
  });


myapp.controller('adddoc', function($resource, $scope,$http,$routeParams){

        
              $scope.message = 'register doc';
        
        $scope.postform = function(){
            
          
        
            var rsrc = $resource('/adddoc');
            
            rsrc.save($scope.newuser, function()
            {
                
            $scope.message = "new doc added";
             window.location='/#doctors'
            
            })
  
        }
        
});

/*myapp.controller('adddoc', function($resource, $scope,$http,$routeParams){
alert("heekkkkmk");
        $http.post('/adddoc').success(function(response){
        
           // window.location='/#doctors'
        })
        
});*/


myapp.controller('edit', function($resource, $scope,$http,$routeParams){
var doc_id=$routeParams.id;
        $http.post('/editdoc/'+doc_id+'').success(function(response){
        
            window.location='/#doctors'
        })
        
});

myapp.controller('delete', function($resource, $scope,$http,$routeParams){
var doc_id=$routeParams.id;
        $http.post('/delete/'+doc_id).success(function(response){
        
            window.location='/#doctors'
        })
        
});

myapp.controller('doctors', function($resource, $scope,$http,$routeParams){

        $http.get('/doctors').success(function(response){
            $scope.alldoctors = response;
            
            //window.location='/#doctors'
        })
        
});

myapp.factory('showData', function(){
    return { status: ' ' };
});

myapp.controller('myAppointment', function($resource, $scope,$http,$routeParams){

        $http.get('/myAppointment').success(function(response){
        
            $scope.appts =response;
           
        })
});

myapp.controller('showDocAppt', function($resource, $scope,$http,$routeParams){
var doc_id=$routeParams.id;
        $http.get('/showDocAppt/'+doc_id+'').success(function(response){
        
            $scope.appts =response;
           
        })
});

  myapp.controller('cancelAppt', function($resource, $scope,$http,$routeParams,$cookies){

      var appt_id=$routeParams.id;

       console.log(appt_id);
      $http.post('/cancelAppt/'+appt_id).success( function(response) {

          window.location='/#myAppointment'
          
      })
  });