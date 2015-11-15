var response_recieved = false;
var socket = null;
var chatTable = document.getElementById("chat_table");
	var isopen = false;
	var mood = '';
	var socket1 = null;
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


	   socket1 = new WebSocket("ws://127.0.0.1:9001");
	   socket1.binaryType = "arraybuffer";
	   socket1.onopen = function() {
	      console.log("Connected!");
	      isopen = true;
	   }
	   socket1.onmessage = function(e) {
	  
	         console.log("Text message received: " + e.data);
	      
  			var cells = "";	
			cells += "<tr>";
			cells +="<td style='float:right;' class='btn0' id=phrase_"+e.data+"><label style='font-size:15px; width=100% text-align:right;'>"+e.data+"<span>: Avi</span></label></td>";
			cells += "</tr>";
			chat_table.innerHTML += cells;
	   }
	   socket1.onclose = function(e) {
	      console.log("Connection closed.");
	      socket1 = null;
	      isopen = false;
	   }
	};

     function send_sms(text) {
           if (isopen) {
              socket1.send(text);
              console.log("Text message sent." + text);               
           } else {
              console.log("Connection not opened.")
           }
        };



// startChars();
