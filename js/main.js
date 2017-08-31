const electron = require('electron')
const {app, BrowserWindow, ipcMain} = electron

const path = require('path')
const url = require('url')

var whatsapp = require("./whatsapp.js").whatsapp
var texteditor = require("./texteditor.js").texteditor

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
  acceptFirstMouse: true,  
  slashes: true
  }))

	var keyWidth = screenSize.width * 0.4;
  win.setPosition( screenSize.width - controlPanelwidith, 0 );
  win.setAlwaysOnTop(true)
  
  win.on('closed', () => {
    win = null
  })

 // win.openDevTools()
}

app.on('ready', function(){

  screenSize = electron.screen.getPrimaryDisplay().workAreaSize;

  createWindow()
  console.log( whatsapp )
  whatsapp.init()
  texteditor.init()

  texteditor.enableWindow();

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

      if(texteditor != null){
        texteditor.doForceFocus = false
        texteditor.window.setAlwaysOnTop(false);
      }

      if( whatsapp.window == null ){
        whatsapp.enableWindow()

      }else{
        texteditor.doForceFocus = false
        texteditor.window.setAlwaysOnTop(false);        
        whatsapp.window.setAlwaysOnTop(true);
      }
      
    }
  }else if(  arg == "texteditor") {

    if(texteditor){
      if( texteditor.window == null )
        texteditor.enableWindow()
      else{
        if(whatsapp.window)
          whatsapp.window.setAlwaysOnTop(false);
          texteditor.window.setAlwaysOnTop(true); 
          texteditor.doForceFocus = true       
      }
    }
  }
  
  event.returnValue = 'Ok'
})



ipcMain.on('toggleUpDownScrollBar', (event, arg) => {
    whatsapp.toggleUpDownScrollBar();
})
