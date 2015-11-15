var response_recieved = false;
var socket = null;
	var isopen = false;
	var mood = '';
	window.onload = function() {
	var artist = $("#artist").val();
	   $("#img1").hide();
	   $("#img2").hide();
	   socket = new WebSocket("ws://127.0.0.1:9000");
	   socket.binaryType = "arraybuffer";
	   socket.onopen = function() {
	      console.log("Connected!");
	      isopen = true;
	   }
	   socket.onmessage = function(e) {
	  console.log("Server called me",e.data);
	      if (typeof e.data == "string") {
	         if (e.data == 'true'){
		        $("#out").show();
		        response_recieved = true;
	         }
	         console.log("Text message received: " + e.data);
	      }
	   }
	   socket.onclose = function(e) {
	      console.log("Connection closed.");
	      socket = null;
	      isopen = false;
	   }
	};

// startChars();