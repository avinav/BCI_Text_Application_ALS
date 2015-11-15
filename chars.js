function startChars(){
	var answer = document.getElementById("answer");
	answer.innerHTML = "";
	var phraseTable = document.getElementById("phrase_table");
	phraseTable.innerHTML = "";
	var quesTable = document.getElementById("beta_table");
	quesTable.innerHTML = "";
	
	var table = document.getElementById("alpha_table");

	var response_id = 76;
	var stop_id = 13;
	var row_len = 5, col_len = 6;
	var breakFlag=false;
	var timeout = 1000;
	var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Enter","Bksp","Next","Prev"];

	$('#divChars').show();
	$('#divPhrase').hide();
	$('#divQues').hide();
	


	function create_table(){		
		var cells = "";
		var k = 0;
		console.log(alphabet.length);
		for(var i=0;i<row_len;i++){
			cells += "<tr>";
			for(var j=0;j<col_len;j++){
				if(k<alphabet.length){
					cells +="<td style='float:left' class='btn1' id="+(alphabet[k])+">"+(alphabet[k++])+"</td>";
				}
			}
			cells += "</tr>";
		}

		table.innerHTML = cells;
	}

	create_table();

	function highlight_row(index){

		if(index == 0){
			t_row = table.rows[table.rows.length-1]
			
		}
		else{
			t_row = table.rows[index-1];
		}

		setRowHighlightStyle(t_row,"White");
		resetTableWeight();
		t_row = table.rows[index]
		setRowHighlightStyle(t_row,"Yellow");
		table.rows[index].style.fontWeight = 'bold';
	}

	function setRowHighlightStyle(row, color){
		nodes = row.childNodes;
		for (i = 0; i < nodes.length; i++){
			child = nodes[i].id;
			$('#'+child).css("background-color", color);
		}
	}
	function resetTableWeight(){
		for(var i=0;i<row_len;i++){
				table.rows[i].style.fontWeight = 'normal';
		}
	}

	function highlight_cell(row_index, col_index){
		var row = table.rows[row_index]	
		if(row){
			var previous;
			if(col_index == 0)
				previous = row.childNodes[row.childNodes.length-1].id;	
			else
				previous = row.childNodes[col_index-1].id;	
			var child = row.childNodes[col_index].id;
			$('#'+previous).css("background-color", "Yellow");		
			$('#'+child).css("background-color", "Blue");
			// row.style.fontWeight = 'bold'
			// resetColumnDeco(row_index);
			// if(row.cells[col_index])
			// 	row.cells[col_index].style.textDecoration = 'underline';
		}
	}

	function resetColumnDeco(row_index){
		var row = table.rows[row_index]
		for(var i=0;i<row.cells.length;i++){
			row.cells[i].style.textDecoration = 'none';
		}
	}

	function resetAll(){
		var rows = table.rows;
		for(var i = 0; i < rows.length; i++){
			childs = rows[i].childNodes;
			for(var j = 0; j < childs.length; j++){
				child = childs[j].id;
				$('#'+child).css("background-color", "White");
			}
		}
		// for(var i=0;i<row_len;i++){
		// 		table.rows[i].style.fontWeight = 'normal';
		// 		resetColumnDeco(i);
		// }
	}


	window.onkeyup = function(e) {
	   var key = e.keyCode ? e.keyCode : e.which;
	   console.log(key);
	   if (key == stop_id) {
	   		stop_answering();
	   }else if (key == response_id) {
	       response_recieved = true;
	   }
	}


	function start_answering(){
		breakFlag = false;
		response_recieved = false;
		var row_id = 0, col_id=0;

		row_travel();

		function row_travel(){
			if(!response_recieved && !breakFlag){
				highlight_row(row_id);
				row_id = (row_id+1)%row_len;
			    setTimeout(row_travel, timeout);
			} else if(!breakFlag){
				if(row_id==0)
					row_id = row_len-1;
				else
					row_id--;
				response_recieved = false;
				setTimeout(col_travel, timeout);
			}
		}

		function col_travel(){
			if(!response_recieved && !breakFlag){
				highlight_cell(row_id,col_id);
				col_id = (col_id+1)%col_len;
			    setTimeout(col_travel, timeout);
			} else if(!breakFlag){
				if(col_id==0)
					col_id = col_len-1;
				else
					col_id--;
				console.log("Row to focus:"+row_id +"  Col to focus:"+col_id+"  Value:"+alphabet[(row_id*col_len) + col_id]);
				appendAnswer(alphabet[(row_id*col_len) + col_id]);
				resetAll();
				start_answering();
			}
		}
	}

	function appendAnswer(value){
		var answer = document.getElementById("answer");
		answer.innerHTML += value;
	}

	function stop_answering(){
		breakFlag = true;
		resetAll();
	}

	document.getElementById("myBtn").addEventListener("click", start_answering);

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

	function sendText() {
	   if (isopen) {
	      socket.send("Hello, world!");
	      console.log("Text message sent.");               
	   } else {
	      console.log("Connection not opened.")
	   }
	};

	function sendBinary() {
	   if (isopen) {
	      var buf = new ArrayBuffer(32);
	      var arr = new Uint8Array(buf);
	      for (i = 0; i < arr.length; ++i) arr[i] = i;
	      socket.send(buf);
	      console.log("Binary message sent.");
	   } else {
	      console.log("Connection not opened.")
	   }
	};	
}

