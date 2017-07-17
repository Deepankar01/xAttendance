const {core} = require("./core/");
//core.uploadAndRetreiveData()
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const config = require('./config/config.json');


let win;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ 
    fullscreen: config.window.fullscreen, 
    frame: config.window.frame, 
    titleBarStyle: config.window.titleBarStyle,
    width: config.window.width, 
    height: config.window.height,
    resizable: config.window.resizable,
    maximizable:config.window.maximizable,
    fullscreenable:config.window.fullscreenable,
    kiosk:config.window.kiosk,
    transparent:config.window.transparent,
    useContentSize:config.window.useContentSize,
    title:"xAttendance"
 })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, './core/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)

// Quit when all windows are closed.
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
