function emergency(){
	var chatTable = document.getElementById("chat_table");
	var value = "Hey Please come home."
	console.log("calling sms func");
    send_sms(value);
	console.log("called sms func");	
	var cells = "";
	cells += "<tr>";
	cells +="<td style='float:left; width=100% text-align:left;' class='btn0' id=phrase_"+value+"><label style='font-size:15px'>Me: </label>"+value+"</td>";
	cells += "</tr>";
	chat_table.innerHTML += cells; 
	upper();  
}