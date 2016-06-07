'use strict';

angular.module('apiRestNodejsApp')
.service('productoService', function ($http) {
  
  this.agregar = function (producto) {
    
		var request = $http({
                    method: "post",
                    url: "http://localhost:8080/agregarProducto",
                    data: producto                    
                });
	
  };

  this.actualizar = function(producto){



  }

  this.buscar = function(codigo){

     return $http({
      method:'GET',       
      url:'http://localhost:8080/producto/' + codigo
     })
      /*.success(function(data){
        console.log(data.nombre + " "+ data.codigo + " "+ data.cantidad);
        return data;
     })
     .error(function(error){
      console.log("error");
        return false;
     });*/
  }

});