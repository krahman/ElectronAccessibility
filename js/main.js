const electron = require('electron')
const { app, BrowserWindow, ipcMain } = electron

const path = require('path')
const url = require('url')

var whatsapp = require("./whatsapp.js").whatsapp
var texteditor = require("./texteditor.js").texteditor

let windowCP
let winApp
let screenSize;


function createControlPanelWindow() {
  // Create the browser window.
  var controlPanelwidith = screenSize.width * 0.15;

  windowCP = new BrowserWindow({ width: controlPanelwidith, height: screenSize.height, titleBarStyle: 'hidden', frame: false, hasShadow: false })
  windowCP.loadURL(url.format({
    pathname: path.join(__dirname, '../controlPanel.html'),
    protocol: 'file:',
    acceptFirstMouse: true,
    slashes: true,
  }))

  windowCP.setPosition(screenSize.width - controlPanelwidith, 0);
  windowCP.setAlwaysOnTop(true)

  windowCP.on('closed', () => {
    windowCP = null
  })

  // win.openDevTools()
}

function createAppViewWindow() {
  var appViewWidth = (screenSize.width * 0.85) - 5;

  winApp = new BrowserWindow({ width: appViewWidth, height: screenSize.height, titleBarStyle: 'hidden', frame: false, hasShadow: false })
  // win.maximize();
  winApp.loadURL(url.format({
    pathname: path.join(__dirname, '../apps/whatsapp.html'),
    protocol: 'file:',
    acceptFirstMouse: true,
    slashes: true
  }))

  winApp.setPosition(0, 0);
  winApp.setAlwaysOnTop(true)

  // win.openDevTools()
}

app.on('ready', function () {

  screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
  createControlPanelWindow()
  createAppViewWindow()

  //whatsapp.init()
  //whatsapp.enableWindow()
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (windowCP === null) {
    createWindow()
  }

})


// IPC Events -----


ipcMain.on('set-global-context', (event, arg) => {
  console.log(arg)
  winApp.loadURL(url.format({
    pathname: path.join(__dirname, `../apps/${arg}.html`),
    protocol: 'file:',
    acceptFirstMouse: true,
    slashes: true
  }))
})


ipcMain.on('toggleUpDownScrollBar', (event, arg) => {
  whatsapp.toggleUpDownScrollBar();
})