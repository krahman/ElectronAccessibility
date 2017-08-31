const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

const path = require('path')
const url = require('url')

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
	
		//this.window.openDevTools()
	
		this.window.webContents.on('did-finish-load', () => {
			this.window.webContents.send('setScrollUp', "");
		});
	}

	this.toggleUpDownScrollBar = function(){
		
		if( this.window != null  )
			this.window.webContents.send('toggleScroll', "");
		else
			console.log("window is null")
		
	}

}

module.exports.whatsapp = new Whatsapp();