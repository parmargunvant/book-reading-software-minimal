const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    },
    backgroundColor: '#ffffff',
    show: false,
    frame: true,
    titleBarStyle: 'default'
  });

  const isDev = process.env.NODE_ENV === 'development';
  
  if (isDev) {
    mainWindow.loadURL('http://localhost:8080');
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers
ipcMain.handle('open-file-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'eBooks', extensions: ['pdf', 'epub'] },
      { name: 'PDF Files', extensions: ['pdf'] },
      { name: 'EPUB Files', extensions: ['epub'] }
    ]
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    const filePath = result.filePaths[0];
    const fileData = fs.readFileSync(filePath);
    return {
      path: filePath,
      data: fileData.toString('base64'),
      name: path.basename(filePath),
      type: path.extname(filePath).toLowerCase()
    };
  }
  return null;
});

ipcMain.handle('save-book-data', async (event, bookData) => {
  const userDataPath = app.getPath('userData');
  const booksDir = path.join(userDataPath, 'books');
  
  if (!fs.existsSync(booksDir)) {
    fs.mkdirSync(booksDir, { recursive: true });
  }
  
  const dataFile = path.join(booksDir, 'library.json');
  fs.writeFileSync(dataFile, JSON.stringify(bookData, null, 2));
  return true;
});

ipcMain.handle('load-book-data', async () => {
  const userDataPath = app.getPath('userData');
  const dataFile = path.join(userDataPath, 'books', 'library.json');
  
  if (fs.existsSync(dataFile)) {
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
  }
  return { books: [] };
});
