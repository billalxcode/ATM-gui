// Copyright (c) Billal Fauzan - billal.xcode@gmail.com
//          Automated Taller Machine

var monitor = require(process.cwd() + "/src/js/monitor.js")
var database = require(process.cwd() + "/src/js/database.js")
var loginController = require(process.cwd() + "/src/js/loginHandler.js")
const { data } = require("jquery")
const Swal = require("sweetalert2")

var input_card_number = false
var input_card_pin = false
var isLogin = false

const updateInput = (new_value) => {
    if (input_card_number == true && input_card_pin == false ) {
        if (new_value == "clear") {
            document.getElementById("card_number").value = ""
        } else {
            document.getElementById("card_number").value += new_value
        }
    } else if (input_card_number == false && input_card_pin == true) {
        if (new_value == "clear") {
            document.getElementById("card_pin").value = ""
        } else {
            document.getElementById("card_pin").value += new_value
        }
    }
}

const onKeys_enter = () => {
    // Check if input is empty
    var card_number = document.getElementById("card_number")
    var card_pin = document.getElementById("card_pin")
    if (card_number.value == "") {
        Swal.fire("Warning!", "Nomor kartu masih kosong, mohon isi!", "warning")
    } else if (card_pin.value == "") {
        Swal.fire("Warning!", "Nomor pin masih kosong, segera isi!!", "warning")
    } else if (card_pin.value.length != 4) {
        Swal.fire("Warning!", "Pin terdiri dari 4 digit!!", "warning")
    } else {
        loginController.login(card_number.value, card_pin.value).then((data) => {
            if (data == true) {
                isLogin = true
                addButton()
            }
        })
    }
}

const addButton = () => {
    monitor.globalInsertText("Anda berhasil login.")
}

var handleInput = () => {
    var keys0 = document.getElementById("key0")
    var keys1 = document.getElementById("key1")
    var keys2 = document.getElementById("key2")
    var keys3 = document.getElementById("key3")
    var keys4 = document.getElementById("key4")
    var keys5 = document.getElementById("key5")
    var keys6 = document.getElementById("key6")
    var keys7 = document.getElementById("key7")
    var keys8 = document.getElementById("key8")
    var keys8 = document.getElementById("key8")
    var keys9 = document.getElementById("key9")
    var keyscancel = document.getElementById("keycancel")
    var keysclear = document.getElementById("keyclear")
    var keysenter = document.getElementById("keyenter")
    
    // button handle
    keys0.addEventListener("click", () => {
        updateInput("0")
    })

    keys1.addEventListener("click", () => {
        updateInput("1")
    })
    
    keys2.addEventListener("click", () => {
        updateInput("2")
    })

    keys3.addEventListener("click", () => {
        updateInput("3")
    })

    keys4.addEventListener("click", () => {
        updateInput("4")
    })
    
    keys5.addEventListener("click", () => {
        updateInput("5")
    })

    keys6.addEventListener("click", () => {
        updateInput("6")
    })

    keys7.addEventListener("click", () => {
        updateInput("7")
    })
    
    keys8.addEventListener("click", () => {
        updateInput("8")
    })

    keys9.addEventListener("click", () => {
        updateInput("9")
    })

    keysclear.addEventListener("click", () => {
        updateInput("clear")
    })
    
    keysenter.addEventListener("click", onKeys_enter)
}

onload = () => {
    monitor.disable()
    document.getElementById("card_number").addEventListener("click", () => {
        input_card_number = true
        input_card_pin = false
    })

    document.getElementById("card_pin").addEventListener("click", () => {
        input_card_number = false
        input_card_pin = true
    })

    handleInput()
}