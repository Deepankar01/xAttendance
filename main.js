const {core} = require("./core/");
//core.uploadAndRetreiveData()
const { app, BrowserWindow ,ipcMain} = require('electron')
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
    transparent:config.window.transparent,
    useContentSize:config.window.useContentSize,
    title: config.window.title
 })

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, './core/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()
   win.setMenuBarVisibility(false);
   win.setAutoHideMenuBar(true);
   win.setMenu(null);

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

// Listen for async message from renderer process
ipcMain.on('uploadFiles', (event, arg) => {  
    // Print 1
    let data = {};
  arg.forEach((file)=>{
    data[file.files] = file.path;
  });
  
    new core()
    .uploadAndRetreiveData(data.regularization,data.leaveRequest,data.biometric)
    .stripHeaders()
    .processData();

        // .processData();

    // Reply on async message from renderer process
    event.sender.send('uploadFiles-reply', "./finalData.xlsx");
});
