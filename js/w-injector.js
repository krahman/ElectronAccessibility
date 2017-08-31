// inyector.js// Get the ipcRenderer of electron
const {ipcRenderer} = require('electron');

console.log("injector");

var fontSize = "20px";

ipcRenderer.on("change-font-size", function() {

	console.log("resizing...");

	// Set Message text size ----	
	var text_elements = document.getElementsByClassName("selectable-text")
	
	for(var i = 0; i < text_elements.length; i++ ){
		text_elements[i].style.fontSize = fontSize
	}


	// Set Name header size ----
	text_elements = document.getElementsByClassName("chat-title")
	
	for(var i = 0; i < text_elements.length; i++ ){
		text_elements[i].style.fontSize = fontSize
	}

	// force the messages to stay down
	var a = document.getElementsByClassName("pane-chat-msgs pane-chat-body lastTabIndex")[0]
	if( a != null )
		a.scrollTop = 100000

	//window.scrollTo(0,document.body.scrollHeight);
	window.scrollTo(0, 0);

	// Message field ----
	var input_container = document.getElementsByClassName("input-container")[0]
	var input = document.getElementsByClassName("input")[0]
	if(input != null){

		input_container.style.height = "100px"
		input.style.height = "100px"
		input.style.fontSize = "20px"
	}



	var send_button = document.getElementsByClassName("compose-btn-send")[0]
	if(send_button != null){ 
		send_button.style.width = "100px"
		send_button.style.height = "100px"
		send_button.style.backgroundColor = "lightblue"
	}
})


ipcRenderer.on("change-css", function(){


	// contacts -----
	var list_search = document.getElementsByClassName("list-search")[0]
	var input_placeholder = document.getElementsByClassName("input-placeholder")[0]
	var input_search = document.getElementsByClassName("input-search")[0]

	list_search.style.height = "100px"
	input_placeholder.style.height = "100px"
	input_search.style.height = "130px"
	input_search.style.width = "430px"
	input_search.style.backgroundColor = "#e4cccc"
	input_search.style.fontSize = fontSize

})

ipcRenderer.on("alert-something",function(event,data){
    alert(data);
});

ipcRenderer.on("change-text-element",function(event,data){
    // the document references to the document of the <webview>
    document.getElementById(data.id).innerHTML = data.text;
});