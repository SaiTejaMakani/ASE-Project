// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services'])

.config(function($ionicConfigProvider){

})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    var question_num =0;//global variable for question numbers//innitialize to zero after submission
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.controller('SignatureCtrl', function($scope) {
    var canvas = document.getElementById('signatureCanvas');
    var signaturePad = new SignaturePad(canvas);

    $scope.clearCanvas = function() {
        signaturePad.clear();
    }

    $scope.saveCanvas = function() {
        var sigImg = signaturePad.toDataURL();
        $scope.signature = sigImg;
    }

})

.controller('SpeechCtrl', function($scope) {
  $scope.speakText = function(elementId) {
      var Text = document.getElementById(elementId).getElementsByTagName("span")[0].innerText;
      
      //var utterance = new SpeechSynthesisUtterance(Text);//web 
      //window.speechSynthesis.speak(utterance);//web
      
      if((Text =='C Language') || (Text =='Java') || (Text =='Angular JS') || (Text =='MongoDB')){
           localStorage.setItem("selectedSubject",Text);//remove on logout
  
      localStorage.setItem("is_sub_selected",'1');//remove on logout
      }
      localStorage.removeItem("answer_check");
      localStorage.setItem("answer_check",'1');
      var flag_user_answer = localStorage.getItem("user_answer_flag");
      if(flag_user_answer == '1'){
          var number = localStorage.getItem("question_num");
          localStorage.removeItem("user_answer"+number);
          localStorage.setItem("user_answer"+number,Text);
          console.log("user answer:"+localStorage.getItem("user_answer"+number));
      }
      
      
      TTS.speak({
           text:Text.toString(),
           locale: 'en-GB',
           rate: 1.25
       }, function () {
           // Do Something after success
       }, function (reason) {
           // Handle the error case
       });
      
  };
 
})

.controller('ProfileCtrl', function($scope, $http, $state) {//profile data will be updated here
  
     $scope.$on("$ionicView.enter", function (ev) {
              
              if(ev.targetScope !== $scope)
              return;
    
      
      var name=localStorage.getItem("login_user");
       $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/interactive_quiz/collections/Interactive_Quiz_users?q={user.user_name:\''+name+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
          contentType:"application/json"

        }).success(function(data){
            console.log(data[0]);//delete later
            
            $scope.subject_c=data[0].Quiz_c.subject;
            $scope.score_c=data[0].Quiz_c.score;
            $scope.getDatetime_c=data[0].Quiz_c.time;
           
            $scope.subject_java=data[0].Quiz_java.subject;
            $scope.score_java=data[0].Quiz_java.score;
            $scope.getDatetime_java=data[0].Quiz_java.time;
           
            $scope.subject_js=data[0].Quiz_angularjs.subject;
            $scope.score_js=data[0].Quiz_angularjs.score;
            $scope.getDatetime_js=data[0].Quiz_angularjs.time;
           
            $scope.subject_db=data[0].Quiz_mongodb.subject;
            $scope.score_db=data[0].Quiz_mongodb.score;
            $scope.getDatetime_db=data[0].Quiz_mongodb.time;
      
      
  })
    })

 $scope.user_profile = function() {//results data will be updated here.
      $scope.user_email_id=localStorage.getItem("login_email");
      $scope.user_phone_num= localStorage.getItem("login_phone");
      $scope.user_name=localStorage.getItem("login_user");
  }
 
 $scope.result_show = function(collection_name){
     console.log(collection_name);//delete later
     localStorage.removeItem("result_subject");
     localStorage.setItem("result_subject",collection_name);
     $state.go("interactiveQuizApplication.results");
     
 }
 ;
})

.controller('WelcomeCtrl', function($scope, $state, UserService, $ionicLoading) {
  // This method is executed when the user press the "Sign in with Google" button
 
    
    $scope.googleSignIn = function() {
    $ionicLoading.show({
       
      template: 'Logging in...'
        
    });
     // GooglePlus.install();
    window.plugib.googleplus.login(
      {},
      function (user_data) {
        // For the purpose of this example I will store user data on local storage
          alert("success");
        UserService.setUser({
          userID: user_data.userId,
          name: user_data.displayName,
          email: user_data.email,
          picture: user_data.imageUrl,
          accessToken: user_data.accessToken,
          idToken: user_data.idToken
        });

        $ionicLoading.hide();
        $state.go('app.home');
      },
      function (msg) {
          alert("failed");
        $ionicLoading.hide();
      }
    );
  };
});


