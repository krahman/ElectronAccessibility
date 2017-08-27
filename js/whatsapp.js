const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

const path = require('path')
const url = require('url')


// let screenSize;

// const searchFieldPosition = { x: 195, y: 100 }
// let isWindowOpen = false;
// let window = null;

// function init(){


// }

// function enableWindow(){

// 	if( window != null){

// 		window.setAlwaysOnTop( true );
		

// /*			if (window.isAlwaysOnTop()){
// 				window.setAlwaysOnTop( false  );
// 			}else{
// 				window.setAlwaysOnTop( true );
// 			}
// 			*/

// 		return;
// 	}else{
// 		createWindow();
// 	}

// }

// function setOnTop( onTop ){
// }

// function createWindow(){

// 	// Create the browser window.
// 	var whatsWidth =  950
// 	var whatsHeight = screenSize.height * 0.5

// 	window = new BrowserWindow({width: whatsWidth, height: whatsHeight, frame: false})
// 	window.setPosition(0, 0);

// 	// window.loadURL("https://web.whatsapp.com/");

// 	window.loadURL(url.format({
// 		pathname: path.join(__dirname, '../whatsapp.html'),
// 		protocol: 'file:',
// 		slashes: true,
// 		acceptFirstMouse: true,
// 		titleBarStyle : "hidden"
// 	}))

// 	window.openDevTools()

// 	window.webContents.on('did-finish-load', () => {
// 		toggleUpDownScrollBar()
// 	});
// }

// function toggleUpDownScrollBar(){

// }



// function checkLoad(){

// 	// let color = robot.getPixelColor(  searchFieldPosition.x, searchFieldPosition.y );
// 	// console.log( color );

// 	// if( color != "ffffff"){
// 	// 	return "loading"
// 	// }else if( color == "red" ){
// 	// 	return "low-battery"
// 	// }
// }

// searchContact = function ( msg, onComplete ){
// 	// robot.moveMouse( searchFieldPosition.x, this.searchFieldPosition.y )
// 	// robot.mouseClick()
// }
// */

function Whatsapp(){

	this.screenSize = null;
	this.isWindowOpen = false;
	this.window = null;

	this.init = function(){

		this.screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
		
	}

	this.enableWindow = function(){

		if( this.window != null){
			
			this.window.setAlwaysOnTop( true );
			return;
			
		}
		else
		{
			this.createWindow();
		}
	}

	this.createWindow = function(){

		var whatsWidth =  950
		var whatsHeight = electron.screen.getPrimaryDisplay().workAreaSize.height * 0.5
	
		this.window = new BrowserWindow({width: whatsWidth, height: whatsHeight, frame: false})
		this.window.setPosition(0, 0);
	
		// window.loadURL("https://web.whatsapp.com/");
	
		this.window.loadURL(url.format({
			pathname: path.join(__dirname, '../whatsapp.html'),
			protocol: 'file:',
			slashes: true,
			acceptFirstMouse: true,
			titleBarStyle : "hidden"
		}))
	
		this.window.openDevTools()
	
		this.window.webContents.on('did-finish-load', () => {
			this.toggleUpDownScrollBar()
		});
	}

	this.toggleUpDownScrollBar = function(){
		
		if( this.window != null  )
			this.window.webContents.send('setScroll', "");
		else
			console.log("window is null")
		
	}

}

/*
module.exports = {
	init : init,
	searchFieldPosition : searchFieldPosition,
	searchContact : searchContact,
	enableWindow : enableWindow,
	toggleUpDownScrollBar : toggleUpDownScrollBar,
	setOnTop : setOnTop,
	window:window
}
*/

module.exports.whatsapp = new Whatsapp();