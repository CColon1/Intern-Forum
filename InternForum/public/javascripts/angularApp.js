var app = angular.module('InternForum', ['ui.router'])


app.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider,$urlRouterProvider){
      $stateProvider
        .state('home', {
          url: '/home',
          templateUrl: '/templates/home.html',
          controller: 'homeCtrl',
          resolve: {
            categoryPromise: ['categories', function(categories){
            var x = categories.getAll();
            return x;

          }],

          }
        }) 
        $stateProvider
        .state('postDetails', {
          url: '/post/{id}',
          templateUrl: '/templates/post.html',
          controller: 'postCtrl',
          resolve: {
            post: ['$stateParams', 'posts', function($stateParams, posts) {
              var x = posts.get($stateParams.id);
                console.log('For x:' + angular.toJson(x));
                return x;
            }]
      }
  })

        $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: '/templates/login.html',
          controller: 'authController'//,
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
          templateUrl: '/templates/register.html',
          controller: 'authController'
          //resolve: {
          //postPromise: ['posts', function(posts){
          //  var x = posts.getAll();
          //  return x;
          //}]
          //}
        })
        $stateProvider
            .state('user', {
                url: '/user/:pictureID',
                templateUrl: '/templates/user.html',
                controller: 'userController',
                resolve: {
                    imagePromise: ['$stateParams','imageFactory', function($stateParams,imageFactory){
                        var x = imageFactory.get($stateParams.pictureID);
                        return x;
                    }]
                }
            })
        $urlRouterProvider.otherwise('home');
    }


]);
