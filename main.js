"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadURL('http://localhost:3001');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
electron_1.app.on('ready', createWindow);
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
