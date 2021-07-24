var electron = require("electron")
var path = require("path")
var url = require("url")


var windows = null

electron.app.on("ready",() => {
    windows = new electron.BrowserWindow({
        width: 1024,
        height: 700,
        title: "ATM GUI",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })

    // windows.webContents.openDevTools()
    
    windows.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }))

    windows.on("ready-to-show", () => {
        windows.show()
    })
})

electron.ipcMain.on("redirect", (event, file) => {
    var new_url = url.format({
        pathname: path.join(__dirname, file),
        protocol: "file:",
        slashes: true
    })
    console.log(new_url)
    windows.loadURL(new_url)
})