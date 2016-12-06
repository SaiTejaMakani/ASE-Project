angular.module('app.controllers', [])

.controller('interactiveQuizApplicationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', function ($scope, LoginService, $stateParams, $location, $state) {

  $scope.validateuser = function()
        {   
            console.log("validation"+$scope.username + $scope.password);

           console.log('in login controller' );//delete later
          LoginService.loginUser($scope.username, $scope.password).success(function(data) {
                console.log("in controller" + data[0]);//delete later
                localStorage.setItem("is_sub_selected",'0');//initializing is selected flag.//zero out after submission.
                localStorage.setItem("question_num",0);//innitializing question number.//zero out after submission.
                localStorage.setItem("score",0);//innitializing test score to zero
                localStorage.setItem("user_answer_flag",'0');//innitialiizing user answer flag
                localStorage.setItem("answer_check",'1');//innitializing local storage values.
                $scope.$root.showMenuIcon = true;
                $state.go('interactiveQuizApplication.selectSubject');
                
                }).error(function(data) {
                                            alert("Log in failed!! please check your credentials and Network connection!");
                                            });

        }
  
})

.controller('signupCtrl', function ($scope, RegisterService, $stateParams, $location, $state, $ionicPopup) {

    $scope.validateemail=function(emailid) {// function validate a valid email format
    var x = emailid;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) {
      return false;
    }
    else{
      return true;
    }
  }


    $scope.registerUser=function()//function to register user and check for the contrains.
    {

    if ($scope.pwd === $scope.cnf_password) {
        if ($scope.pwd.length >= 8) {
        if ($scope.validateemail($scope.emailid)){
            localStorage.setItem('username', $scope.username);//local storage just for testing
            localStorage.setItem('password', $scope.pwd);
            localStorage.setItem('emailid', $scope.emailid);
            localStorage.setItem('phonenumber',$scope.phonenumber);
             
                RegisterService.RegisterUser($scope.username, $scope.emailid, $scope.pwd, $scope.phonenumber).success(function(data) {
                    //alert("inserted successfully");
                    //alert("inserted successfully");
                    $state.go('interactiveQuizApplication.login');
                
                }).error(function(data) {
                                            var alertPopup = $ionicPopup.alert({
                                            title: 'registration failed!',
                                            template: 'Please check your network connection!'
                                            });
                                        });
    
            ///
            alert(localStorage.getItem('emailid') + "   Registered Successfully.");
          //  $location.url = '/templates/login.html';

        }
        else{
            alert("Not a valid e-mail address");
        }

        }
        else{
        alert("Password should be more that 8 letters. Please try again");
        }
    }
    else {
        alert("passwords does not match please try again");
    }

    }

})

.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('quizCtrl', function ($scope, $stateParams, $state, $http) {
    
    $scope.next_Q = function(){
        var number = localStorage.getItem("question_num");//make zero on submitting and while loading view
        var sel_sub = localStorage.getItem("selectedSubject"); //remove when logout
        var collection_name;
        if(Number(number) <10){
             document.getElementById("quiz-form17").reset();
            
            document.getElementById("selectSubject-form15").reset();
        var flag_answer_check = localStorage.getItem("answer_check");
        if(flag_answer_check == '1'){
            localStorage.removeItem("answer_check");
            localStorage.setItem("answer_check",'0');
            flag_answer_check='0';
        number= Number(number) +1;
        localStorage.removeItem("question_num");//  on logout remove.
        localStorage.setItem("question_num",number);
        if(sel_sub == 'C Language'){
            collection_name = 'Interactive_Quiz_sub_rep_c';
           }
            else if(sel_sub == 'Java'){
                collection_name = 'Interactive_Quiz_sub_rep_java';
            }
            else if(sel_sub == 'Angular JS'){
                collection_name = 'Interactive_Quiz_sub_rep_angular';
            }
            else{
                collection_name = 'Interactive_Quiz_sub_rep_mongo';
            }
            ///getting a random question from repository.
            var random_q = Math.random() * 100;//TO SLECT A RANDOM NUMBER FROM 100
                random_q = Math.round(random_q);
            var total_q =100;//total number of questions in repository MAX 100 AS MULTIPLIED BY 100
            while(((random_q >= total_q) && (random_q > 0)) ){
               random_q= Math.random() * 100;
               random_q= Math.round(random_q);
            }
           ///
            
        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/interactive_quiz/collections/'+collection_name+'?q={questions.question_id:\''+random_q+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
          contentType:"application/json"

        }).success(function(data){
            console.log(data[0].questions.question);//delete later
        
            
            $scope.quiz_num     =number;
            $scope.quiz_question=data[0].questions.question;
            $scope.quiz_option_a=data[0].questions.option_a;
            $scope.quiz_option_b=data[0].questions.option_b;
            $scope.quiz_option_c=data[0].questions.option_c;
            $scope.quiz_option_d=data[0].questions.option_d;
            var right_answer=data[0].questions.right_answer;
            var question=data[0].questions.question;
            //var your_answer= localStorage.setItem("user_answer"+number);   //get from, speech function.
            console.log(right_answer);//delete later
            //var user_answer = localStorage.getItem("user_answer");
            localStorage.removeItem("right_answer"+number);
            localStorage.setItem("right_answer"+number,right_answer); //storing each question and answer.
            
            localStorage.removeItem("question"+number);
            localStorage.setItem("question"+number,question);
            //your answer is already in local storage.
            })
        
        }
            else{
                alert("Slelect any answer!");
            }
        }
        
        else{
            //localStorage.removeItem("question_num");// on or on submit remove.
            //localStorage.setItem("question_num",0);// do 0 on submit.
            alert("Please submit!");
        }
    }
    
    $scope.submit_quiz = function(){
        
        var retVal = confirm("Do you want to submit the test?");
               if( retVal == true ){//write all you code here to submit
                 var number =localStorage.getItem("question_num");
                   number = Number(number);// converting into number format.
                   console.log("question number"+number);//delete later
                 var score= 0;
                 var sel_sub =localStorage.getItem("selectedSubject");
                   
                for (var i= number; i<10;i++){// when user submits uncompleted test
                    
                    localStorage.removeItem("question"+number);
                    localStorage.setItem("question"+number,"Not yet taken");
                    
                    localStorage.removeItem("right_answer"+number);
                    localStorage.setItem("right_answer"+number,'');
                    
                    localStorage.removeItem("user_answer"+number);
                    localStorage.setItem("user_answer"+number,'');
                    
                }   
                 //calulating score  
                   for(j=1; j<number; j++){
                       console.log(localStorage.getItem("user_answer"+j));
                         console.log(localStorage.getItem("right_answer"+j));
                       if(localStorage.getItem("user_answer"+j) == localStorage.getItem("right_answer"+j))
                           
                       {score = Number(score) + 1;
                        
                       }
                   }
                   
                   //time stamp
                   var timestamp = new Date().getTime();//update into db
                   var name = localStorage.getItem('login_user');
                   console.log("user name::"+name);
                // updating data base with local storage data.
                   if (sel_sub == "C Language"){//c update
                 $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/interactive_quiz/collections/Interactive_Quiz_users?q={user.user_name:\''+name+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
                     data: JSON.stringify( { "$set" : {  
                         "Quiz_c":{
                                    subject:"C language",
                                    score:score,
                                    time:timestamp,
                                    questions:{
                                        1:localStorage.getItem("question1"),
                                        2:localStorage.getItem("question2"),
                                        3:localStorage.getItem("question3"),
                                        4:localStorage.getItem("question4"),
                                        5:localStorage.getItem("question5"),
                                        6:localStorage.getItem("question6"),
                                        7:localStorage.getItem("question7"),
                                        8:localStorage.getItem("question8"),
                                        9:localStorage.getItem("question9"),
                                        10:localStorage.getItem("question10"),
                                        },
                                    answers:{
                                        1:localStorage.getItem("user_answer1"),
                                        2:localStorage.getItem("user_answer2"),
                                        3:localStorage.getItem("user_answer3"),
                                        4:localStorage.getItem("user_answer4"),
                                        5:localStorage.getItem("user_answer5"),
                                        6:localStorage.getItem("user_answer6"),
                                        7:localStorage.getItem("user_answer7"),
                                        8:localStorage.getItem("user_answer8"),
                                        9:localStorage.getItem("user_answer9"),
                                        10:localStorage.getItem("user_answer10"),
                                        },
                                    r_answers:{
                                        1:localStorage.getItem("right_answer1"),
                                        2:localStorage.getItem("right_answer2"),
                                        3:localStorage.getItem("right_answer3"),
                                        4:localStorage.getItem("right_answer4"),
                                        5:localStorage.getItem("right_answer5"),
                                        6:localStorage.getItem("right_answer6"),
                                        7:localStorage.getItem("right_answer7"),
                                        8:localStorage.getItem("right_answer8"),
                                        9:localStorage.getItem("right_answer9"),
                                        10:localStorage.getItem("right_answer10"),
                                        },
                                                      
                                                      } } }),
                    contentType:"application/json"

                    }).success(function(data){
                        alert("your test score:" + score); 
                    }) 
                   }
                   else if(sel_sub == "Java"){//java update
                       $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/interactive_quiz/collections/Interactive_Quiz_users?q={user.user_name:\''+name+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
                     data: JSON.stringify( { "$set" : {  
                         "Quiz_java":{
                                    subject:"Java",
                                    score:score,
                                    time:timestamp,
                                    questions:{
                                        1:localStorage.getItem("question1"),
                                        2:localStorage.getItem("question2"),
                                        3:localStorage.getItem("question3"),
                                        4:localStorage.getItem("question4"),
                                        5:localStorage.getItem("question5"),
                                        6:localStorage.getItem("question6"),
                                        7:localStorage.getItem("question7"),
                                        8:localStorage.getItem("question8"),
                                        9:localStorage.getItem("question9"),
                                        10:localStorage.getItem("question10"),
                                        },
                                    answers:{
                                        1:localStorage.getItem("user_answer1"),
                                        2:localStorage.getItem("user_answer2"),
                                        3:localStorage.getItem("user_answer3"),
                                        4:localStorage.getItem("user_answer4"),
                                        5:localStorage.getItem("user_answer5"),
                                        6:localStorage.getItem("user_answer6"),
                                        7:localStorage.getItem("user_answer7"),
                                        8:localStorage.getItem("user_answer8"),
                                        9:localStorage.getItem("user_answer9"),
                                        10:localStorage.getItem("user_answer10"),
                                        },
                                    r_answers:{
                                        1:localStorage.getItem("right_answer1"),
                                        2:localStorage.getItem("right_answer2"),
                                        3:localStorage.getItem("right_answer3"),
                                        4:localStorage.getItem("right_answer4"),
                                        5:localStorage.getItem("right_answer5"),
                                        6:localStorage.getItem("right_answer6"),
                                        7:localStorage.getItem("right_answer7"),
                                        8:localStorage.getItem("right_answer8"),
                                        9:localStorage.getItem("right_answer9"),
                                        10:localStorage.getItem("right_answer10"),
                                        },
                                                      
                                                      } } }),
                    contentType:"application/json"

                    }).success(function(data){
                        alert("your test score:" + score); 
                    }) 
                   }
                   else if(sel_sub == "Angular JS"){//angular js update
                       $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/interactive_quiz/collections/Interactive_Quiz_users?q={user.user_name:\''+name+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
                     data: JSON.stringify( { "$set" : {  
                         "Quiz_angularjs":{
                                    subject:"Angular JS",
                                    score:score,
                                    time:timestamp,
                                    questions:{
                                        1:localStorage.getItem("question1"),
                                        2:localStorage.getItem("question2"),
                                        3:localStorage.getItem("question3"),
                                        4:localStorage.getItem("question4"),
                                        5:localStorage.getItem("question5"),
                                        6:localStorage.getItem("question6"),
                                        7:localStorage.getItem("question7"),
                                        8:localStorage.getItem("question8"),
                                        9:localStorage.getItem("question9"),
                                        10:localStorage.getItem("question10"),
                                        },
                                    answers:{
                                        1:localStorage.getItem("user_answer1"),
                                        2:localStorage.getItem("user_answer2"),
                                        3:localStorage.getItem("user_answer3"),
                                        4:localStorage.getItem("user_answer4"),
                                        5:localStorage.getItem("user_answer5"),
                                        6:localStorage.getItem("user_answer6"),
                                        7:localStorage.getItem("user_answer7"),
                                        8:localStorage.getItem("user_answer8"),
                                        9:localStorage.getItem("user_answer9"),
                                        10:localStorage.getItem("user_answer10"),
                                        },
                                    r_answers:{
                                        1:localStorage.getItem("right_answer1"),
                                        2:localStorage.getItem("right_answer2"),
                                        3:localStorage.getItem("right_answer3"),
                                        4:localStorage.getItem("right_answer4"),
                                        5:localStorage.getItem("right_answer5"),
                                        6:localStorage.getItem("right_answer6"),
                                        7:localStorage.getItem("right_answer7"),
                                        8:localStorage.getItem("right_answer8"),
                                        9:localStorage.getItem("right_answer9"),
                                        10:localStorage.getItem("right_answer10"),
                                        },
                                                      
                                                      } } }),
                    contentType:"application/json"

                    }).success(function(data){
                        alert("your test score:" + score); 
                    }) 
                   }
                   else {//mongo db update
                       $http({
                    method: 'PUT',
                    url: 'https://api.mongolab.com/api/1/databases/interactive_quiz/collections/Interactive_Quiz_users?q={user.user_name:\''+name+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
                     data: JSON.stringify( { "$set" : {  
                         "Quiz_mongodb":{
                                    subject:"Mongo DB",
                                    score:score,
                                    time:timestamp,
                                    questions:{
                                        1:localStorage.getItem("question1"),
                                        2:localStorage.getItem("question2"),
                                        3:localStorage.getItem("question3"),
                                        4:localStorage.getItem("question4"),
                                        5:localStorage.getItem("question5"),
                                        6:localStorage.getItem("question6"),
                                        7:localStorage.getItem("question7"),
                                        8:localStorage.getItem("question8"),
                                        9:localStorage.getItem("question9"),
                                        10:localStorage.getItem("question10"),
                                        },
                                    answers:{
                                        1:localStorage.getItem("user_answer1"),
                                        2:localStorage.getItem("user_answer2"),
                                        3:localStorage.getItem("user_answer3"),
                                        4:localStorage.getItem("user_answer4"),
                                        5:localStorage.getItem("user_answer5"),
                                        6:localStorage.getItem("user_answer6"),
                                        7:localStorage.getItem("user_answer7"),
                                        8:localStorage.getItem("user_answer8"),
                                        9:localStorage.getItem("user_answer9"),
                                        10:localStorage.getItem("user_answer10"),
                                        },
                                    r_answers:{
                                        1:localStorage.getItem("right_answer1"),
                                        2:localStorage.getItem("right_answer2"),
                                        3:localStorage.getItem("right_answer3"),
                                        4:localStorage.getItem("right_answer4"),
                                        5:localStorage.getItem("right_answer5"),
                                        6:localStorage.getItem("right_answer6"),
                                        7:localStorage.getItem("right_answer7"),
                                        8:localStorage.getItem("right_answer8"),
                                        9:localStorage.getItem("right_answer9"),
                                        10:localStorage.getItem("right_answer10"),
                                        },
                                                      
                                                      } } }),
                    contentType:"application/json"

                    }).success(function(data){
                        alert("your test score:" + score); 
                        localStorage.removeItem("question_num");//resetting question number after submission.
                        localStorage.setItem("question_num",0);
                    }) 
                   }
                   
                //removing unneccessary local storage items after submission.  
                   localStorage.removeItem("question_num");
                   localStorage.setItem("question_num",0);
                 $state.go("interactiveQuizApplication.profile");// goes to profile page AFTER SUBMITTING TEST.
                  return true;
               }
               else{
                  alert ("please continue your test!");
                  return false;
               }

    } 

})

.controller('selectSubjectCtrl', function ($scope, $stateParams, $stateParams, $state) {
    $scope.enableMenubtn = function(){//to enable side menu on this page
           console.log("in select subject page");//remove later
          $scope.$root.showMenuIcon = true;
       
        //console.log(localStorage.getItem("question_num"));//zero it after succeesful submission.
        
    }
               
    $scope.start_quiz = function(){
        var flag_sub = localStorage.getItem("is_sub_selected")// mzke 0 on submitting.
        
        if(flag_sub == '1'){
            localStorage.removeItem("user_answer_flag");
            localStorage.setItem("user_answer_flag",'1');
            $state.go('quiz');//at end of everything go to quiz page.
        
    }
        else{
            alert("Please select a subject to start the test!");
        }
    
        
}
            
} )

.controller('resultsCtrl', function ($scope, $stateParams, $state, $http ,$q) {
    
    //global arrays
        var questions =[];
        var your_answers = [];
        var right_answers =[];
    
        $scope.$on("$ionicView.beforeEnter", function (ev) {
              
              if(ev.targetScope !== $scope)
              return;
             
        console.log("in ion view");//remove later 
        var collection_name =localStorage.getItem("result_subject");
        var name=localStorage.getItem("login_user");
        var deferred = $q.defer();
        var promise = deferred.promise;
        
        //getting user data
          $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/interactive_quiz/collections/Interactive_Quiz_users?q={user.user_name:\''+name+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
          contentType:"application/json"

        }).success(function(data){             
            for(var i=0; i<10; i++){ 
               
              // questions[i]= data[0].Quiz_c.questions[i+1];//delete now
                if(collection_name=='Interactive_Quiz_sub_rep_c'){
                    
                    if((data[0].Quiz_c.questions[i+1] == 'Not yet taken')  ){
                        for(var j=i; j<10 ;j++){
                            your_answers[j] =' ';
                        right_answers[j]=' ';
                        questions[j]    ='Not attempted.';
                        
                        }
                        i=10;
                        
                    }
                    else{ 
                         your_answers[i] =data[0].Quiz_c.answers[i+1];
                         right_answers[i]=data[0].Quiz_c.r_answers[i+1];
                         questions[i]    =data[0].Quiz_c.questions[i+1];          
                        }
                   
                    //console.log("in c" + data[0].Quiz_c.questions[i+1] + questions[i]);//delete later
                }
                else if(collection_name=='Interactive_Quiz_sub_rep_java'){
                    
                     
                     if(data[0].Quiz_java.questions[i+1] == 'Not yet taken'){
                        for(var j=i; j<10 ;j++){
                            your_answers[j] =' ';
                        right_answers[j]=' ';
                        questions[j]    ='Not attempted.';
                        
                        }
                        i=10;
                    }
                    else{ 
                         //question data base
                         questions[i]=data[0].Quiz_java.questions[i+1];//change
                         right_answers[i]=data[0].Quiz_java.r_answers[i+1];//change
                         your_answers[i]=data[0].Quiz_java.answers[i+1];
                        }
                }
                
                else if(collection_name=='Interactive_Quiz_sub_rep_angular'){
                   
                    if(data[0].Quiz_angularjs.questions[i+1] == 'Not yet taken'){
                        for(var j=i; j<10 ;j++){
                            your_answers[j] =' ';
                        right_answers[j]=' ';
                        questions[j]    ='Not attempted.';
                        
                        }
                        i=10;
                    }
                    else{ 
                         //question data base
                          questions[i]=data[0].Quiz_angularjs.questions[i+1];//change
                          right_answers[i]=data[0].Quiz_angularjs.r_answers[i+1];//change
                          your_answers[i]= data[0].Quiz_angularjs.answers[i+1];
                        }
                }
                else {//mango db
                  
                    
                    
                    if(data[0].Quiz_mongodb.questions[i+1] == 'Not yet taken'){
                        for(var j=i; j<10 ;j++){
                            your_answers[j] =' ';
                        right_answers[j]=' ';
                        questions[j]    ='Not attempted.';
                        
                        }
                        i=10;
                    }
                    else{ 
                         //question data base
                         questions[i]=data[0].Quiz_mongodb.questions[i+1];//change
                         right_answers[i]=data[0].Quiz_mongodb.r_answers[i+1];//change
                         your_answers[i]= data[0].Quiz_mongodb.answers[i+1];
                        }
                }
            }
              
          deferred.resolve();
        })
        //
       deferred.promise.then(function(){
    
       })
        promise.success = function(fn) {
          promise.then(function(){ 
                                    
                                 });
           
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
       
        
    });
    
     $scope.$on("$ionicView.afterEnter", function (ev) {
         
         if(ev.targetScope !== $scope)
              return;
        $scope.question_1=questions[0];
        $scope.your_answer_1=your_answers[0];
        $scope.right_answer_1=right_answers[0];
        
        $scope.question_2=questions[1];
        $scope.your_answer_2=your_answers[1];
        $scope.right_answer_2=right_answers[1];
        
        $scope.question_3=questions[2];
        $scope.your_answer_3=your_answers[2];
        $scope.right_answer_3=right_answers[2];
        
        $scope.question_4=questions[3];
        $scope.your_answer_4=your_answers[3];
        $scope.right_answer_4=right_answers[3];
        
        $scope.question_5=questions[4];
        $scope.your_answer_5=your_answers[4];
        $scope.right_answer_5=right_answers[4];
        
        $scope.question_6=questions[5];
        $scope.your_answer_6=your_answers[5];
        $scope.right_answer_6=right_answers[5];
        
        $scope.question_7=questions[6];
        $scope.your_answer_7=your_answers[6];
        $scope.right_answer_7=right_answers[6];
        
        $scope.question_8=questions[7];
        $scope.your_answer_8=your_answers[7];
        $scope.right_answer_8=right_answers[7];
        
        $scope.question_9=questions[8];
        $scope.your_answer_9=your_answers[8];
        $scope.right_answer_9=right_answers[8];
        
        $scope.question_10=questions[9];
        $scope.your_answer_10=your_answers[9];
        $scope.right_answer_10=right_answers[9];  
         
     });
    
    
    
})

.controller('updateProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('scribbleCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])



