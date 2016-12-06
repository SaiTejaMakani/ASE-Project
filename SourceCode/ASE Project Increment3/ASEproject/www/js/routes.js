angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('interactiveQuizApplication', {
    url: '/side-menu21',
    templateUrl: 'templates/interactiveQuizApplication.html',
    controller: 'interactiveQuizApplicationCtrl'
  })

  .state('interactiveQuizApplication.login', {
    url: '/login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('interactiveQuizApplication.signup', {
    url: '/signup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('interactiveQuizApplication.profile', {
    url: '/profile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('quiz', {
    url: '/quiz',
    templateUrl: 'templates/quiz.html',
    controller: 'quizCtrl'
  })
  
  .state('scribble', {
    url: '/scribble',
    templateUrl: 'templates/scribble.html',
    controller: 'scribbleCtrl'
  })

  .state('interactiveQuizApplication.selectSubject', {
    url: '/subjects',
    views: {
      'side-menu21': {
        templateUrl: 'templates/selectSubject.html',
        controller: 'selectSubjectCtrl'
      }
    }
  })

  .state('interactiveQuizApplication.results', {
    url: '/results',
    views: {
      'side-menu21': {
        templateUrl: 'templates/results.html',
        controller: 'resultsCtrl'
      }
    }
  })

  .state('interactiveQuizApplication.updateProfile', {
    url: '/update_profile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/updateProfile.html',
        controller: 'updateProfileCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/side-menu21/login')

  

});