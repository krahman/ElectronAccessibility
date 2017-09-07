const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron

const path = require('path')
const url = require('url')


function TextEditor() {

	this.screenSize;
	this.window = null

	this.init = function () {
		screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
	}

	this.doForceFocus = true;

	this.forceFocus = function (that) {

		if (this.window == null)
			return;


		if (this.doForceFocus == true) {
			this.window.setAlwaysOnTop(true)
			this.window.focus()
		} else {
			this.window.setAlwaysOnTop(false)
		}
	}

	this.createWindow = function () {

		// Create the browser window.
		var whatsWidth = 950
		var whatsHeight = screenSize.height * 0.5

		this.window = new BrowserWindow({ width: whatsWidth, height: whatsHeight, frame: false })
		this.window.setPosition(0, 0)

		// window.loadURL("https://web.whatsapp.com/");

		this.window.loadURL(url.format({
			pathname: path.join(__dirname, '../app/texteditor.html'),
			protocol: 'file:',
			slashes: true,
			acceptFirstMouse: true,
			titleBarStyle: "hidden"
		}))

		// this.window.setAlwaysOnTop(true)
		// this.window.focus()

		//this.forceFocus()
		//this.window.openDevTools()
	}

	this.enableWindow = function () {

		if (this.window != null) {

			//this.window.setAlwaysOnTop( true );

			/*
			if (this.window.isAlwaysOnTop()){
				this.window.setAlwaysOnTop( false  );
			}else{
				
			}
			*/

		} else {
			this.createWindow();
		}
	}

	this.setOnTop = function (onTop) {
		// this.window.setAlwaysOnTop(true)
	}
}

var texteditor = new TextEditor()

function setForceFocus() {
	texteditor.forceFocus()
	setTimeout(setForceFocus, 500)
}

setTimeout(setForceFocus, 500)




module.exports.texteditor = texteditor;