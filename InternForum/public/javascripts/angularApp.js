var app = angular.module('InternForum', ['ui.router'])

app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider,$urlRouterProvider){
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/templates/home.html',
          controller: 'homeCtrl'//,
          //resolve: {
          //postPromise: ['posts', function(posts){
          //  var x = posts.getAll();
          //  return x;
          //}]
          //}
        }) 
        $stateProvider
        .state('postDetails', {
          url: '/post',
          templateUrl: '/templates/post.html',
          controller: 'postCtrl'//,
          //resolve: {
          //postPromise: ['posts', function(posts){
          //  var x = posts.getAll();
          //  return x;
          //}]
          //}
        })  
        $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: '/login.html',
          controller: 'loginCtrl'//,
          //resolve: {
          //postPromise: ['posts', function(posts){
          //  var x = posts.getAll();
          //  return x;
          //}]
          //}
        })  
        $stateProvider
        .state('register', {
          url: '/register',
          templateUrl: '/register.html',
          controller: 'registerCtrl'//,
          //resolve: {
          //postPromise: ['posts', function(posts){
          //  var x = posts.getAll();
          //  return x;
          //}]
          //}
        })   

         $urlRouterProvider.otherwise('home');
    }


]);
