const db = require('./db')
const send_answer = require('./send')
const utils = require('./utils')

exports.registration = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            db.users.addNewUser(req.body.login, req.body.password).then(
                result => {
                    send_answer('templates/index.html', res, 'text/html')
                },
                error => {
                    // Add error check
                    res.statusCode = 400
                    res.end("Something went wrong")
                }
            )
        },
        error => {
            
        }
    )
}
