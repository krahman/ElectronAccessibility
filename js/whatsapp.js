const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

const path = require('path')
const url = require('url')

let screenSize;

const searchFieldPosition = { x: 195, y: 100 }
let isWindowOpen = false;
let window = null;


function init(){

	screenSize = electron.screen.getPrimaryDisplay().workAreaSize;

}

function enableWindow(){

	if( window != null){

		if (window.isMinimized()){
			window.restore()
		}else{
			window.minimize()
		}

		return;
	}else{
		createWindow();
	}

}

function createWindow(){

	// Create the browser window.
	var whatsWidth =  950
	var whatsHeight = screenSize.height * 0.5

	window = new BrowserWindow({width: whatsWidth, height: whatsHeight, frame: false})
	window.setPosition(0, 0);

	// window.loadURL("https://web.whatsapp.com/");

	window.loadURL(url.format({
		pathname: path.join(__dirname, '../whatsapp.html'),
		protocol: 'file:',
		slashes: true,
		acceptFirstMouse: true,
		titleBarStyle : "hidden"
	}))

	window.openDevTools()

	window.webContents.on('did-finish-load', () => {
		toggleUpDownScrollBar()
	});
}

function toggleUpDownScrollBar(){
	if( window != null  )
		window.webContents.send('setScroll', "");
	else
		console.log("window is null")
}



function checkLoad(){

	// let color = robot.getPixelColor(  searchFieldPosition.x, searchFieldPosition.y );
	// console.log( color );

	// if( color != "ffffff"){
	// 	return "loading"
	// }else if( color == "red" ){
	// 	return "low-battery"
	// }
}

searchContact = function ( msg, onComplete ){
	// robot.moveMouse( searchFieldPosition.x, this.searchFieldPosition.y )
	// robot.mouseClick()
}

module.exports = {
	init : init,
	searchFieldPosition : searchFieldPosition,
	searchContact : searchContact,
	enableWindow : enableWindow,
	toggleUpDownScrollBar : toggleUpDownScrollBar
}
