'use strict';

angular.module('apiRestNodejsApp')
.service('UsuarioiService', function ($http) {
  
  this.agregar = function (usuario) {
    $http({
	   	method:'POST', 
	   	
	   	url:'http://localhost:8080/agregarUsuario'	
	   	/*params: {
	   		email: usuario.email,
	   		contrasena: usuario.pass
	   	}*/
	   });
  };

  this.actualizar = function(usuario){

  }

  this.buscar = function(rut){

  }

});