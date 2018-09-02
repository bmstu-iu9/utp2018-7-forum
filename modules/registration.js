const db = require('./db')
const send_answer = require('./send')
const utils = require('./utils')

exports.registration = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            console.log(result.login, result.password)
            db.users.addUser(result.login, result.password).then(
                result => {
                    console.log('success')
                    send_answer('templates/index.html', res, 'text/html')
                },
                error => {
                    console.log(error)
                    res.statusCode = 400
                    res.end("Something went wrong")
                }
            )
        },
        error => {
            console.log(error)
            res.statusCode = 400
            res.end("Something went wrong")
        }
    )
}
