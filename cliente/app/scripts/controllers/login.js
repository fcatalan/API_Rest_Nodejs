'use strict';

/**
 * @ngdoc function
 * @name apiRestNodejsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the apiRestNodejsApp
 */
angular.module('apiRestNodejsApp')
  .controller('LoginCtrl', function ($scope, LoginService) {
  	$scope.Usuario = 
  	{ 
      email: "hhhhkkk@aaa.cl", 
    	pass: "kkkkk",

    	iniciarSesion: function(){
    		if(LoginService.consultarUsuaio($scope.Usuario))
    		{
    			console.log("conecto");
    		}
      },

      ej: function(){

        var a =  LoginService.consultarUsuaio($scope.Usuario);        
      },

      ejOst: function(){
        LoginService.ejOst($scope.Usuario);
      }

  };
  
 });
