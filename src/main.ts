import { app, BrowserWindow } from 'electron';
import path from 'path';
import { chromium } from 'playwright';
import 'dotenv/config';
import { env } from './env';

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


(async()=>{
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  //TODO: Xを開いてログインするようにする
  await page.goto('https://www.google.com');

  //TODO: パスワードなどを使ってログインするようにする
  console.log(env.X_EMAIL)

})()
