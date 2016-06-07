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
        templateUrl: 'views/agregarUsuario.html',
        controller: 'UsuarioCtrl'
      })
      .when('/actualizarUsuario', {
        templateUrl: 'views/actualizarUsuario.html',
        controller: 'UsuarioCtrl'
      })
      .when('/agregarProducto', {
        templateUrl: 'views/agregarProducto.html',
        controller: 'ProductoCtrl'        
      })
      .when('/actualizarProducto', {
        templateUrl: 'views/actualizarProducto.html',
        controller: 'ProductoCtrl'  
      })
      .when('/eliminarProducto', {
        templateUrl: 'views/eliminarProducto.html',
        controller: 'ProductoCtrl'  
      })
      .when('/eliminarUsuario', {
        templateUrl: 'views/eliminarUsuario.html',
        controller: 'ProductoCtrl'  
      })

      .otherwise({
        redirectTo: '/'
      });
  });
