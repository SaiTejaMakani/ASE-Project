angular.module('app.controllers', [])

.controller('interactiveQuizApplicationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('loginCtrl', ['$scope','$http','$location', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams,$routeParams, $location) {

  $scope.validateuser = function()
        {   
            console.log($scope.username + $scope.password);

            if ( localStorage.getItem('username') === $scope.username){

                if ( localStorage.getItem('password') === $scope.password) {
                    $location.url='/selectSubjects.html';
                    console.log("valid user:");
                }
                else{
                    alert("wrong username / password enter again" );
                }
            }
            else {
                alert("wrong username / password enter again" );
            }

        }
}])

.controller('signupCtrl', ['$scope','$http','$location', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName

function ($scope, $stateParams,$location, $stateParams) {

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
            alert(localStorage.getItem('emailid') + "   Registered Successfully.");
            $location.url = '/templates/login.html';

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

}])

.controller('profileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('quizCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('selectSubjectCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('resultsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

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



