const electron = require('electron');
const platform = require('os').platform();  // 获取平台：https://nodejs.org/api/os.html#os_os_platform
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

const fs = require('fs');

const devUrl = 'http://localhost:3000';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;






function createWindow()
{
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: {
    webSecurity: false, // 这样可以在 webview 中加载/显示本地计算机的图片。
    preload: path.join(__dirname, '/renderer.js')
  } });

  const startUrl = process.env.IS_DEV ? devUrl : url.format({
    pathname: path.join(__dirname, '/build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  if(startUrl.startsWith('http'))
  {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });

  const { ipcMain } = require('electron')
// 监听渲染进行发送的消息
ipcMain.on('renderer-msg', (event, arg) => {
  console.log(arg) // prints "帮我创建一个新的页面",  
  // 执行创建页面的操作
  


  
  fs.readFile('target.txt', (err, data) => {
    // success err === null  fail error is an Error object
    if (err) {
      throw err;
    }
    console.log(data.toString());
    event.reply('main-msg', data.toString());  // 给渲染进程回复消息
  });

  
})

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', function ()
{
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null)
    {
        createWindow();
    }
});

// electron.ipcMain.on('chooseFolder', function(){
//     const dialog = electron.dialog;
//     dialog.showOpenDialog(mainWindow, {
//         properties: ['openDirectory']
//     });
// });

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
