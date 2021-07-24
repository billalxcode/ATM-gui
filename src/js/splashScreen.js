const {enable, destroy} = require("splash-screen")
const { ipcRenderer } = require("electron")

onload = () => {
    enable("circular")

    setTimeout(() => {
        destroy()
    }, 3000)

    setTimeout(() => {
        ipcRenderer.send("redirect", "index.html")
    }, 1000)
}