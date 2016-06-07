'use strict';

/**
 * @ngdoc function
 * @name apiRestNodejsApp.controller:ProductoCtrl
 * @description
 * # ProductoCtrl
 * Controller of the apiRestNodejsApp
 */
angular.module('apiRestNodejsApp')
  .controller('ProductoCtrl', function ($scope, productoService, $http) {
  	$scope.Producto = 
  	{ 

    	agregar: function(){
    		//productoService.agregar($scope.Producto);

             $http({
                    method: "post",
                    url: "http://localhost:8080/agregarProducto",
                    data: $scope.Producto                    
                })
             .error(function(error){
                  $scope.Producto.mensaje = "Problemas con el servidor";
                  console.log("Problemas con el servidor");
                  
         });

      },

      actualizar: function(){
        //productoService.actualizar($scope.Producto);
        console.log("servicio angular producto" + $scope.Producto.codigo);

      $http({
          method:'put',       
          url:'http://localhost:8080/actualizarProduct/',
          data: $scope.Producto
         })
          .success(function(data){
            
            
            $scope.Producto.codigo         = data.codigo;
            $scope.Producto.nombre         = data.nombre;
            $scope.Producto.cantidad       = data.cantidad;
            $scope.Producto.precioUnitario = data.precioUnitario;
         

         })
         .error(function(error){
          $scope.Producto.mensaje = "Problemas con el servidor";
          console.log("Problemas con el servidor");            
         });

      },

      buscar: function(){

        $http({
          method:'GET',       
          url:'http://localhost:8080/producto/' + $scope.Producto.codigo
         })
          .success(function(data){
            console.log(data);
           if(data != null)
            {
              console.log(data.nombre + " "+ data.codigo + " "+ data.cantidad);
                      
              $scope.Producto.nombre          = data.nombre;
              $scope.Producto.codigo          = data.codigo;
              $scope.Producto.cantidad        = data.cantidad;
              $scope.Producto.precioUnitario  = data.precioUnitario;
            }else{
              $scope.Producto.mensaje = "El producto no se encuentra";
            }

         })
         .error(function(error){
          console.log("error");
            $scope.Producto.mensaje = "Problemas con el servidor";
         });

      }

  };
 });