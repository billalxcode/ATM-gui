const sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database( process.cwd() + "/database/database.db")

var insert = (command) => {
    db.serialize(() => {
        db.run(command, () => {
            return "sukses"
        })
    })
}

const createUsers = (fullname, email, contact, addresss, card_number, card_pin) => new Promise((resolve, reject) => {
    const commands = `INSERT INTO users(id, name, email, contact, address, card_number, card_pin, card_type) VALUES(NULL, '${fullname}', '${email}', '${contact}', '${addresss}', ${card_number}, ${card_pin}, 1)`
    resolve(insert(commands))
})


const insertCardNumber = (card_number, card_pin) => new Promise((resolve, reject) => {
    const commands = `INSERT INTO card(id, card_number, card_pin, card_type, card_balance) VALUES(NULL, ${card_number}, ${card_pin}, 1, 0)`
    resolve(insert(commands))
})

const getUsersByCard = (card_number) => new Promise((resolve, reject) => {
    const commands = `SELECT * FROM users WHERE card_number=${card_number}`
    db.all(commands, (err, rows) => {
        resolve(rows)
    })
})

module.exports = {
    createUsers,
    getUsersByCard,
    insertCardNumber
}