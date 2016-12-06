angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('RegisterService', function($q, $http) {
  return {
    RegisterUser: function(user_name,email,password,phonenumber) {
      var deferred = $q.defer();
      var promise = deferred.promise;
    
      var json_data= {"user":{
          "user_name": user_name,
          "user_email":email,
          "password":password,
          "phone_number":phonenumber,
        },
        "Quiz_c":{
            subject:"C language",
            score:'0',
            time:'Not yet taken',
            questions:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
            },
           answers:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
           },
            r_answers:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
           },
            
        },
        "Quiz_java":{
            subject:"Java",
            score:'0',
            time:'Not yet taken',
            questions:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
            },
           answers:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
           },
             r_answers:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
           },
            
        },
        "Quiz_angularjs":{
            
            subject:"Angular JS",
            score:'0',
            time:'Not yet taken',
            questions:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
            },
           answers:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
           },
             r_answers:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
           },
                      
                     },
        "Quiz_mongodb":{
            subject:"Mongo DB",
            score:'0',
            time:'Not yet taken',
            questions:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
            },
           answers:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
           },
             r_answers:{
                1:'Not yet taken',
                2:'Not yet taken',
                3:'Not yet taken',
                4:'Not yet taken',
                5:'Not yet taken',
                6:'Not yet taken',
                7:'Not yet taken',
                8:'Not yet taken',
                9:'Not yet taken',
                10:'Not yet taken',
           },
            
        },
       }
      $http({
        method: 'POST',
        url: 'https://api.mongolab.com/api/1/databases/interactive_quiz/collections/Interactive_Quiz_users?apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
        data: JSON.stringify(json_data),
        contentType:"application/json"

      }).success(function(data){

        deferred.resolve('Welcome!');
      })
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;

    }
  }
})

.service('LoginService', function($q, $http) {
    return {
      loginUser: function(name, pw) {
        var deferred = $q.defer();
        var promise = deferred.promise;
          console.log(name,pw);//delete
          
        $http({
          method: 'GET',
          url: 'https://api.mongolab.com/api/1/databases/interactive_quiz/collections/Interactive_Quiz_users?q={user.user_name:\''+name+'\'}&apiKey=0NJg4lLMCs86yffZ5Sq8oeZtegeyt3Of',
          contentType:"application/json"

        }).success(function(data){
            console.log(data[0]);
            
          if (name == data[0].user.user_name && pw == data[0].user.password) {
            localStorage.setItem("login_user",data[0].user.user_name);//remove at logout
            localStorage.setItem("login_email",data[0].user.user_email);//remove at logout 
            localStorage.setItem("login_phone",data[0].user.phone_number);//remove at logout   
            deferred.resolve('Welcome ' + data[0].user_name + '!');
          } else {
              alert('wrong credentials!!');
            deferred.reject('Wrong credentials.');
          }

        })
        promise.success = function(fn) {
          promise.then(fn);
          return promise;
        }
        promise.error = function(fn) {
          promise.then(null, fn);
          return promise;
        }
        return promise;
      }

    }})

.service('UserService', function() {
	// For the purpose of this example I will store user data on ionic local storage but you should save it on a database

  var setUser = function(user_data) {
    window.localStorage.starter_google_user = JSON.stringify(user_data);
  };

  var getUser = function(){
    return JSON.parse(window.localStorage.starter_google_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
});
