'use strict';

angular.module('apiRestNodejsApp')
.service('productoService', function ($http) {
  
  this.agregar = function (producto) {
    
		var request = $http({
                    method: "post",
                    url: "http://localhost:8080/profile",
                    data: usuario                    
                });
	
  };

  this.actualizar = function(producto){

  }

  this.buscar = function(codigo){

  }

});