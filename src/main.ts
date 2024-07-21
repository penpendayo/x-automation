import { app, BrowserWindow } from 'electron';
import path from 'node:path';

import { chromium } from 'playwright';

import 'dotenv/config';
import { env } from './env';

const interval = 2000;

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    void mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    void mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();
};

const main = async () => {

  // eslint-disable-next-line unicorn/prefer-module
  if (require('electron-squirrel-startup')) {
    app.quit();
  }

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

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://x.com/login');

  await page.locator('input[name="text"]').fill(env.X_EMAIL);
  await page.waitForTimeout(interval);
  await page.getByRole('button', { name: '次へ' }).click();

  await page.locator('input[name="text"]').fill(env.X_TEL);
  await page.waitForTimeout(interval);
  await page.getByRole('button', { name: '次へ' }).click();

  await page.locator('input[name="password"]').fill(env.X_PASSWORD);
  await page.waitForTimeout(interval);
  await page.getByRole('button', { name: 'ログイン' }).click();
};

void main();
