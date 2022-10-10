import { app, BrowserWindow } from 'electron';
import { watch } from 'fs';

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
    return win;
}

app.whenReady().then(() => {
    const win = createWindow();
    console.log("Electron application started");
    watch('./dist', (eventType, filename) => {
        win.reload();
    });
});