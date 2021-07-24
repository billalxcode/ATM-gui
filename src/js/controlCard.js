// Copyright (c) Billal Fauzan - billal.xcode@gmail.com
//          Automated Taller Machine

const Swal = require("sweetalert2")
const { ipcRenderer } = require("electron")
const { spawn } = require("child_process")
const fs = require("fs")
const { data } = require("jquery")
const database = require(process.cwd() + "/src/js/database.js")

var registered = false

const randint = (min, max) => {
    return Math.floor((Math.random() * (max - min) + min))
}

const execute = (environment, filename, args) => {
    const arg = []
    arg.push(filename)
    for (i = 0; i < args.length; i++) {
        arg.push(args[i])
    }
    
    const processExecute = spawn(environment, arg).stdout
    processExecute.on("data", (data) => {
        return data.toString()
    })
}

const range = (n) => {
    let v = []
    for (i = 0; i < n; i++) v.push(i)
    return v
}

const generate_card = () => {
    var card = []
    for (i of range(4)) {
        var randnum = randint(0, 9999)
        var generated = `${String(randnum).padStart(4, '0')}`
        card.push(generated)
    }
    var scard = card.join(" ")
    document.getElementById("card_number").value = scard
    document.getElementById("card_number").readOnly = true
}

const _resetAll = () => {
    document.getElementById("pin").value = ""
    generate_card()
}

var insertData = () => {
    // Parse data
    var fullname
    var email
    var contact
    var address
    var card_number
    var card_pin
    
    var session_file = process.cwd() + "/database/registerSession.json"
    const contents = JSON.parse(fs.readFileSync(session_file, "utf-8"))
    fullname = contents["fullname"]
    email = contents["email"]
    contact = contents["phone"]
    address = contents["address"]
    card_number = document.getElementById("card_number").value
    card_number = card_number.split(" ").join("")
    console.log(card_number)
    card_pin = document.getElementById("pin").value
    database.createUsers(fullname, email, contact, address, card_number, card_pin).then((data) => {
        database.insertCardNumber(card_number, card_pin).then((data) => {
            return "ok"
        })
    })
}

const submitData = () => {
    var card_number = document.getElementById("card_number").value
    var card_pin = document.getElementById("pin").value
    if (card_pin.length == 4) {
        const pyOut = execute("python3", process.cwd() + "/src/python/createCardImage.py", [`${card_number}`])
        console.log(pyOut)
        insertData()
        registered = true
    } else if (card_pin == 0) {
        Swal.fire("Hm...", "Pin tidak boleh kosong!", "warning")
    } else {
        Swal.fire("Hm...", "Pin harus terdiri dari 4 digit", "warning")
    }
}

const changeUI = () => {
    var btngroup = document.getElementById("button")
    var formGroup = document.getElementById("form")
    var card_image = document.createElement("img")
    var new_form = document.createElement("div")

    btngroup.removeChild(document.getElementById("btnDaftar"))
    btngroup.removeChild(document.getElementById("btnReset"))
    document.getElementById("pin").readOnly = true
    card_image.src = "../card.png"
    card_image.className = "img-fluid"
    card_image.alt = "Card Image"
    card_image.id = "card"
    new_form.className = "form-group mt-3"
    new_form.appendChild(card_image)
    formGroup.appendChild(new_form)
}

const on_formGenerate = () => {
    Swal.fire({
        title: "Apakah yakin? ",
        text: "Data akan disimpan",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yakin",
        cancelButtonText: "Tidak",
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Tunggu",
                text: "Tunggu sebentar, akun anda sedang di proses...",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading()
                }
            }).then((result) => {
                submitData()
                changeUI()
            })
        }
    })
    
}

onload = () => {
    if (registered == false) {
        generate_card()
    }
    // Form submit
    var btn_reset = document.getElementById("btnReset")
    var btn_kembali = document.getElementById("btnKembali")
    var form_generate = document.getElementById("btnDaftar")
    btn_reset.addEventListener("click", _resetAll)
    btn_kembali.addEventListener("click", () => {
        if (registered == false) {
            var to_file = "/src/register.html"
        } else if (registered == true) {
            var to_file = "/index.html"
        }
        ipcRenderer.send("redirect", to_file)
    })
    form_generate.addEventListener("click", on_formGenerate)
}