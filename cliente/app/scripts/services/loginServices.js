'use strict';

angular.module('apiRestNodejsApp')
.service('LoginService', function ($http) {
	
  this.consultarUsuaio = function(usuario) {

	   var ser = $http({
	   	method:'GET', 
	   	
	   	url:'http://localhost:8080/usuario/'
	   	/*params: {
	   		email: usuario.email,
	   		contrasena: usuario.pass
	   	}*/
	   });

	   ser.success(function(data){
		   	console.log(data.email);
		   	return true;

	   })
	   .error(function(data){
			console.log("error");
		   	return false;
	   });
	};

	this.ejOst = function(usuario){
		var request = $http({
                    method: "post",
                    url: "http://localhost:8080/profile",
                    data: usuario
                    /*{
                        id: 4,
                        name: "Kim",
                        status: "Best Friend"
                    }*/
                });
	};

});