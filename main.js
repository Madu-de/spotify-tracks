const { app, BrowserWindow } = require('electron');

let win;

function createWindow() {
    win = new BrowserWindow({
        window: 600,
        height: 600,
        backgroundColor: '#121212',
        icon: `file://${__dirname}/dist/spotify-tracks/assets/imgs/spotify.png`
    });

    win.loadURL(`file://${__dirname}/dist/spotify-tracks/index.html`);

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// win.webContents.openDevTools();

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});