'use strict';

/**
 * @ngdoc function
 * @name apiRestNodejsApp.controller:ProductoCtrl
 * @description
 * # ProductoCtrl
 * Controller of the apiRestNodejsApp
 */
angular.module('apiRestNodejsApp')
  .controller('ProductoCtrl', function ($scope, productoService) {
  	$scope.Producto = 
  	{ 

    	agregar: function(){
    		productoService.agregar($scope.Producto);
      },

      actualizar: function(){
        productoService.actualizar($scope.Producto);
      },

      buscar: function(){
      	$scope.Producto.buscar($scope.Producto.codigo);
      }

  };
 });