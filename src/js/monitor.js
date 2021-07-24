// Copyright (c) Billal Fauzan - billal.xcode@gmail.com
//          Automated Taller Machine

var $ = require("jquery")

var monitor = null

const globalInsertText = (text) => new Promise((resolve, reject) => {
    monitor = document.getElementById("monitor")
    monitor.value = text
    resolve(true)
})

const disable = () => new Promise((resolve, reject) => {
    monitor = document.getElementById("monitor")
    monitor.disabled = true
    resolve(true)
})

const enable = () => new Promise((resolve, reject) => {
    monitor = document.getElementById("monitor")
    monitor.disabled = false
    resolve(true)
})


module.exports = {
    globalInsertText,
    disable,
    enable,
}