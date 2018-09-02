const db = require('./db')
const send_answer = require('./send')
const utils = require('./utils')

exports.registration = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            db.users.addUser(result.login, result.password).then(
                result => {
                    db.sessions.createSession(result.login).then(
                        function(cookies) {
                            send_answer('templates/index.html', res, 'text/html', cookies=cookies, redirect='/')
                        }).catch(function(err) {
                            console.log(err)
                            res.statusCode = 400
                            res.end('Something went wrong')
                        })
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
