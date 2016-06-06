'use strict';

/**
 * @ngdoc function
 * @name apiRestNodejsApp.controller:UsuarioCtrl
 * @description
 * # UsuarioCtrl
 * Controller of the apiRestNodejsApp
 */
angular.module('apiRestNodejsApp')
  .controller('UsuarioCtrl', function ($scope, UsuarioiService) {
  	$scope.Usuario = 
  	{ 

    	agregar: function(){
    		UsuarioiService.agregar($scope.Usuario);
      },

      actualizar: function(){
        UsuarioiService.actualizar($scope.Usuario);
      },

      buscar: function(){
        UsuarioiService.buscar($scope.Usuario.rut);
      }

  };
 });