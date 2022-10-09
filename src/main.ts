import { app, BrowserWindow } from 'electron';

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.webContents.openDevTools();
    win.loadFile('./dist/index.html');
}

app.whenReady().then(() => {
    createWindow();
    console.log("Electron application started");
});