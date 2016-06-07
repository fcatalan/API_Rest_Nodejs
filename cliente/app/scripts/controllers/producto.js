'use strict';

/**
 * @ngdoc function
 * @name apiRestNodejsApp.controller:ProductoCtrl
 * @description
 * # ProductoCtrl
 * Controller of the apiRestNodejsApp
 */
angular.module('apiRestNodejsApp')
  .controller('ProductoCtrl', function ($scope, $http) {
  	$scope.Producto = 
  	{ 

    	agregar: function(){
    		//productoService.agregar($scope.Producto);
      },

      actualizar: function(){
        //productoService.actualizar($scope.Producto);
      },

      buscar: function(){

        $http({
          method:'GET',       
          url:'http://localhost:8080/producto/' + $scope.Producto.codigo
         })
          .success(function(data){
            console.log(data.nombre + " "+ data.codigo + " "+ data.cantidad);
                    
            $scope.Producto.nombre          = data.nombre;
            $scope.Producto.codigo          = data.codigo;
            $scope.Producto.cantidad        = data.cantidad;
            $scope.Producto.precioUnitario  = data.precioUnitario;
        
         })
         .error(function(error){
          console.log("error");
            return false;
         });

      }

  };
 });