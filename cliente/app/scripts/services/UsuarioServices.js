'use strict';

angular.module('apiRestNodejsApp')
.service('UsuarioiService', function ($http) {
  
  this.agregar = function (usuario) {
    			$http({
                    method: "post",
                    url: "http://localhost:8080/agregarUsuario",
                    data: usuario                    
                });
  };

  this.actualizar = function(usuario){

  }

  this.buscar = function(rut){

  }

});