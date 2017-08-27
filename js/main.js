const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

const path = require('path')
const url = require('url')

var whatsapp = require("./whatsapp.js")

let win
let screenSize;



function createWindow () {
  // Create the browser window.

  var controlPanelwidith = 600;

  win = new BrowserWindow({width: controlPanelwidith, height:  screenSize.height * 0.5 ,titleBarStyle: 'hidden',  frame: false})
  // win.maximize();
  win.loadURL(url.format({
  pathname: path.join(__dirname, '../controlPanel.html'),
  protocol: 'file:',
  slashes: true
  }))

	var keyWidth = screenSize.width * 0.4;
  win.setPosition( screenSize.width - controlPanelwidith, 0 );

  win.on('closed', () => {
    win = null
  })

  win.openDevTools()
}

app.on('ready', function(){

  screenSize = electron.screen.getPrimaryDisplay().workAreaSize;

  createWindow()

  whatsapp.init()

})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }

})


// IPC Events -----


ipcMain.on('set-global-context', (event, arg) => {
  
  console.log("setting global context: " + arg );
  if( arg == "whatsapp" ){
    if(whatsapp){
      whatsapp.enableWindow()
    }

  }else if(  arg == "text-editor") {

  }
  
  event.returnValue = 'Ok'
})



ipcMain.on('toggleUpDownScrollBar', (event, arg) => {
    whatsapp.toggleUpDownScrollBar();
})
