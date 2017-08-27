const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

const path = require('path')
const url = require('url')


function TextEditor(){

	this.screenSize;
	this.window = null

	this.init = function(){
		screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
	}

	this.createWindow = function (){
		
			// Create the browser window.
			var whatsWidth =  950
			var whatsHeight = screenSize.height * 0.5
		
			this.window = new BrowserWindow({width: whatsWidth, height: whatsHeight, frame: false})
			this.window.setPosition(0, 0);
		
			// window.loadURL("https://web.whatsapp.com/");
		
			this.window.loadURL(url.format({
				pathname: path.join(__dirname, '../texteditor.html'),
				protocol: 'file:',
				slashes: true,
				acceptFirstMouse: true,
				titleBarStyle : "hidden"
			}))
		
			this.window.openDevTools()

		}

		this.enableWindow = function(){

			if( this.window != null){
				
				//this.window.setAlwaysOnTop( true );

				/*
				if (this.window.isAlwaysOnTop()){
					this.window.setAlwaysOnTop( false  );
				}else{
					
				}
				*/
			
			}else{
				this.createWindow();
			}
		}

		this.setOnTop = function(onTop){
			// this.window.setAlwaysOnTop(true)
		}
}

var texteditor = new TextEditor()

module.exports.texteditor = texteditor;