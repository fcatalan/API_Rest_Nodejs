'use strict';

/**
 * @ngdoc function
 * @name apiRestNodejsApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the apiRestNodejsApp
 */
angular.module('apiRestNodejsApp')
  .controller('LoginCtrl', function ($scope, LoginService, $http) {
  	$scope.Usuario = 
  	{ 
    	iniciarSesion: function(){
    	 /*	if(LoginService.consultarUsuaio($scope.Usuario))
    	 	{
    			console.log("conecto");
    		}
        */

        console.log('http://localhost:8080/loginUsuario/' + $scope.Usuario.email + "/" +$scope.Usuario.pass)

       $http({
        method:'GET',       
        url:'http://localhost:8080/loginUsuario/' + $scope.Usuario.email + "/" +$scope.Usuario.pass
       })
       .success(function(data){
        
        if(data != null){

          console.log(data.email);
          window.location.href = "#/agregarUsuario";
        }else{
          $scope.Usuario.mensaje = "El usuario o contraseña son invalidas";
        }
       })
       .error(function(data){
         console.log("Problemas con el servidor");
            $scope.Usuario.mensaje = "Problemas con el servidor";
       });

      },
  };
  
 });
