'use strict';

/**
 * @ngdoc function
 * @name apiRestNodejsApp.controller:UsuarioCtrl
 * @description
 * # UsuarioCtrl
 * Controller of the apiRestNodejsApp
 */
angular.module('apiRestNodejsApp')
  .controller('UsuarioCtrl', function ($scope, UsuarioiService, $http) {
  	$scope.Usuario = 
  	{ 

    	agregar: function(){
    	//	UsuarioiService.agregar($scope.Usuario);

          $http({
                    method: "post",
                    url: "http://localhost:8080/agregarUsuario",
                    data: $scope.Usuario                    
                }).error(function(error){
          console.log("Problemas con el servidor");
            $scope.Producto.mensaje = "Problemas con el servidor";
         });;

      },

      actualizar: function(){
        //UsuarioiService.actualizar($scope.Usuario);

        $http({
          method:'put',       
          url:'http://localhost:8080/actualizarUsuario/',
          data: $scope.Usuario
         })
          .success(function(data){
            console.log(data.nombre + " "+ data.rut + " "+ data.email);
          
            $scope.Usuario.rut        = data.rut;
            $scope.Usuario.email      = data.email;
            $scope.Usuario.pass       = data.pass;
            $scope.Usuario.nombre     = data.nombre;
            $scope.Usuario.apellidoP  = data.apellidoP;
            $scope.Usuario.apellidoM  = data.apellidoM;
        
         })
         .error(function(error){
          console.log("Problemas con el servidor");
            $scope.Usuario.mensaje = "Problemas con el servidor";
         });

      },

      buscar: function(){
        //UsuarioiService.buscar($scope.Usuario.rut);
        $http({
          method:'GET',       
          url:'http://localhost:8080/usuarioByRut/' + $scope.Usuario.rut
         })
          .success(function(data){
            if(data != null)
            {
                console.log(data.nombre + " "+ data.rut + " "+ data.email);
                        
                $scope.Usuario.rut        = data.rut;
                $scope.Usuario.email      = data.email;
                $scope.Usuario.pass       = data.pass;
                $scope.Usuario.nombre     = data.nombre;
                $scope.Usuario.apellidoP  = data.apellidoP;
               $scope.Usuario.apellidoM  = data.apellidoM;
            }else{
              $scope.Usuario.mensaje = "El Usuario no se encuentra";
            }
         })
         .error(function(error){
          console.log("Problemas con el servidor");
            $scope.Usuario.mensaje = "Problemas con el servidor";
         });

      }


      }

  });