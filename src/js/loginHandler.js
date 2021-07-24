const database = require(process.cwd() + "/src/js/database.js")

const login = (card_number, card_pin) => new Promise((resolve, reject) => {
    database.getUsersByCard(card_number).then((data) => {
        var index = 0
        var card_p = data[index]["card_pin"]
        if (card_pin == card_p) {
            resolve(true)
        } else {
            resolve(false)
        }
    })
})

module.exports = {
    login
}