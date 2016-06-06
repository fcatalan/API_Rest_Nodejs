'use strict';

/**
 * @ngdoc overview
 * @name apiRestNodejsApp
 * @description
 * # apiRestNodejsApp
 *
 * Main module of the application.
 */
angular
  .module('apiRestNodejsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/agregarUsuario', {
        templateUrl: 'views/agregarUsuario.html'
      })
      .when('/actualizarUsuario', {
        templateUrl: 'views/actualizarUsuario.html'
      })
      .when('/agregarProducto', {
        templateUrl: 'views/agregarProducto.html'
      })
      .when('/actualizarProducto', {
        templateUrl: 'views/actualizarProducto.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
