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
      console.log(document.getElementById(elementId).getElementsByTagName("span")[0].innerText);
      var Text = document.getElementById(elementId).getElementsByTagName("span")[0].innerText;
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

.controller('ProfileCtrl', function($scope) {//profile data will be updated here
  $scope.resultLine = function() {
      $scope.score=10;
      $scope.getDatetime= new Date();
  };
    
  $scope.user_profile = function() {//results data will be updated here.
      $scope.user_email_id='admin@umkc.edu';
      $scope.user_phone_num= '8162550411';
      $scope.user_name='admin';
  };


 
});




