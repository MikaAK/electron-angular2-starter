var app = require('app'),
    BrowserWindow = require('browser-window'),
    crashReporter = require('crash-reporter')

var HEIGHT = 720,
      WIDTH  = 1000

var MainWindow

crashReporter.start()

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin')
    app.quit()
})

app.on('ready', function() {
  MainWindow = new BrowserWindow({width: WIDTH, height: HEIGHT})

  console.log(__dirname)
  MainWindow.loadUrl('http://localhost:3000/index.html')

  MainWindow.on('closed', function() {
    mainWindow = null
  })
})
