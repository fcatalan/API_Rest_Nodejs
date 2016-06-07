var serverIP = 'localhost';
var port = 8080;

//Variables locales
var room = 'Preguntas';	//Sala que está conectado el usuario

//Conexión al socket del servidor
try {
	socket = io.connect(serverIP+':'+port+'/');
	
	//Callback de la función multicast
	socket.on('multicastCallback', function (data) {
		$('#mensajes').append('<p>' + data.text + '</p>');
	});

	//Callback de la función broadcast
	socket.on('broadcastCallback', function (data) {
		$('#mensajes').append('<p>' + data.text + '</p>');
	});

	console.log('Conexión establecida Socket')
}
catch (err) {
	alert('No se encuentra el servidor Node.js');
}

$(document).ready(function() {	  	
    	$('#mensajes').hide();
    	$('#chat').hide();
        
      $('#enviar').click(function(){
        if($('#nombre').val()!=null && $('#email').val()!=null ){
          $('#ingreso').hide();
          $('#mensajes').show();
          $('#chat').show();
          var nombre = $('#nombre').val();

		  socket.emit('initRoom', {room: room});
		  socket.emit('broadcast', {text: nombre+" entró a la sala " + room});
        }
      });

      $('#enviar_mensaje').click(function(){
      	var nombre = $('#nombre').val();
        var mensaje = $('#m').val();
		$('#m').val('');
		socket.emit('multicast', {text: nombre+" dice :"+mensaje, room: room});
      });


      $('#salir').click(function(){
        socket.emit('exitRoom', {room: room});
        alert('Gracias por consultar en nuestro sitio');
        window.location.reload();
      });



});


