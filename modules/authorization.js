const db = require('./db')
const send_answer = require('./send')
const utils = require('./utils')

exports.authorize = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            db.users.getUser(result.login, result.password).then(
                result => {
                    db.sessions.createSession(result.login).then(
                        function(cookies) {
                            send_answer('templates/index.html', res, 'text/html', cookies=cookies, redirect='/')
                        }
                    ).catch(function(error) {
                        console.log(error)
                        res.statusCode = 400
                        res.end("Error while create session")
                    })
                },
                error => {
                    console.log(error)
                    res.statusCode = 400
                    if (error == "Password mismatch"){
                        res.end('Password mismatch')
                    } else {
                        res.end("Error while getting user")
                    }
                }
            )
        },
        error => {
            console.log(error)
            res.statusCode = 400
            res.end("Error while reading body")
        }
    )
}

exports.logout = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            cookies = utils.readCookies(req)
            db.sessions.deleteSession(cookies['session_id']).then(
                result => {
                    send_answer('templates/index.html', res, 'text/html', cookies=result, redirect='/')
                },
                error => {
                    console.log(error)
                    res.statusCode = 400
                    res.end("Error while deleting cookies")
                }
            )
        },
        error => {
            console.log(error)
            res.statusCode = 400
            res.end("Error while read body")
        }
    )
}
