// Copyright (c) Billal Fauzan - billal.xcode@gmail.com
//          Automated Taller Machine

const { remote, ipcMain, ipcRenderer } = require("electron")
const fs = require("fs")

const onHandle_register = () => {
    var full_name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var phone_number = document.getElementById("phone").value
    var address = document.getElementById("address").value

    var session_file = process.cwd() + "/database/registerSession.json"
    if (fs.existsSync(session_file)) {
        const fileContents = fs.readFileSync(session_file, "utf-8")
        const data = JSON.parse(fileContents)
        data["fullname"] = full_name
        data["email"] = email
        data["phone"] = phone_number
        data["address"] = address
        fs.writeFileSync(session_file, JSON.stringify(data), (err) => {
            if (err) console.log("Failed to remove session")
        })

        ipcRenderer.send("redirect", "/src/registerCard.html")
    }
}

const set_value = (selection, text) => {
    var new_selection = selection.slice(1, selection.length)
    if (selection.indexOf("#") == 0) {
        document.getElementById(new_selection).value = text
    } else if (selection.indexOf(".") == 0) {
        document.getElementsByClassName(new_selection).value = text
    } else {
        console.log(selection.indexOf("."))
    }
}

const restoreSession = () => {
    var session_file = process.cwd() + "/database/registerSession.json"
    if (fs.existsSync(session_file)) {
        try {
            const jsonContents = fs.readFileSync(session_file, "utf-8")
            const data = JSON.parse(jsonContents)
            set_value("#name", data["fullname"])
            set_value("#email", data["email"])
            set_value("#phone", data["phone"])
            set_value("#address", data["address"])
        } catch (error) {
            set_value("#name", "")
            set_value("#email", "")
            set_value("#phone", "")
            set_value("#address", "")
        }
    } else {
        set_value("#name", "")
        set_value("#email", "")
        set_value("#phone", "")
        set_value("#address", "")
    }
}

const inputSession = (selection, key) => {
    var values
    var new_selection = selection.slice(1, selection.length)
    if (selection.indexOf("#") == 0) {
        values = document.getElementById(new_selection).value
    } else if (selection.indexOf(".") == 0) {
        values = document.getElementsByClassName(new_selection).value
    } else {
        console.log(selection.indexOf("."))
    }

    var session_file = process.cwd() + "/database/registerSession.json"
    const fileContents = fs.readFileSync(session_file, "utf-8")
    const data = JSON.parse(fileContents)
    data[key] = values
    fs.writeFileSync(session_file, JSON.stringify(data), (err) => {
        if (err) console.log("Failed save session")
    })
}

onload = () => {
    restoreSession()
    const input_name = document.getElementById("name")
    const input_email = document.getElementById("email")
    const input_phone = document.getElementById("phone")
    const input_address = document.getElementById("address")
    input_name.addEventListener("change", () => {
        inputSession("#name", "fullname")
    })
    input_email.addEventListener("change", () => {
        inputSession("#email", "email")
    })
    input_phone.addEventListener("change", () => {
        inputSession("#phone", "phone")
    })
    input_address.addEventListener("change", () => {
        inputSession("#address", "address")
    })
    var formRegister = document.getElementById("btnLanjut")
    formRegister.addEventListener("click", onHandle_register)
}