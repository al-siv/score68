/**
 * Electron main process — window lifecycle management.
 *
 * Creates a single BrowserWindow with no menu bar, loading the Vite renderer.
 */

import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 420,
    height: 680,
    minWidth: 340,
    minHeight: 480,
    show: false,
    resizable: true,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
    },
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

process.on('uncaughtException', (err) => {
  console.error('[main] Uncaught exception:', err)
})

process.on('unhandledRejection', (reason) => {
  console.error('[main] Unhandled rejection:', reason)
})

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.score68.app')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  app.on('render-process-gone', (_event, _webContents, details) => {
    console.error('[main] Renderer process gone:', details.reason, details.exitCode)
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
