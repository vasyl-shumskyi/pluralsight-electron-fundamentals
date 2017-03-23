const electron = require('electron')
const path = require('path')

const images = require('./images')
const menuTemplate = require('./menu')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const Menu = electron.Menu


let mainWindow = null

app.on('ready', _ => {
  mainWindow = new BrowserWindow({
    width: 893,
    height: 725,
    resizeable: false
  })

  mainWindow.loadURL(`file://${__dirname}/capture.html`)

  mainWindow.webContents.openDevTools()

  images.mkdir(images.getPicturesDir(app))

  mainWindow.on('closed', _ => {
    mainWindow = null
  })

  const menuContents = Menu.buildFromTemplate(menuTemplate(mainWindow))
  Menu.setApplicationMenu(menuContents)
})

ipc.on('image-captured', (evt, contents) => {
  images.save(images.getPicturesDir(app), contents, (err, imgPath) => {
    images.cache(imgPath)
  })
})

ipc.on('image-remove', (evt, index) => {
  images.rm(index, _ => {
    evt.sender.send('image-removed', index)
  })
})
