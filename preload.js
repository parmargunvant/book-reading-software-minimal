const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electronAPI', {
    openFileDialog: () => ipcRenderer.invoke('open-file-dialog'),
    saveBookData: (bookData) => ipcRenderer.invoke('save-book-data', bookData),
    loadBookData: () => ipcRenderer.invoke('load-book-data')
  }
);
