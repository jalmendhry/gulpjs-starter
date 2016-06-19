var app = angular.module('myApp', [
  'main',
  'ui.router',
  'customers',
  'services'
]);

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");
  
  $stateProvider
    .state('index', {
      url: "/",
      controller: "mainCtrl",
      templateUrl: "main.html"
    });
});