const db = require('./db')
const send_answer = require('./send')
const utils = require('./utils')

exports.authorize = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            db.users.getUser(result.login).then(
                result => {
                    db.sessions.createSession(result.login).then(
                        function(cookies) {
                            send_answer('templates/index.html', res, 'text/html', cookies=cookies, redirect='/')
                        }
                    ).catch(function(error) {
                        console.log(error)
                        res.statusCode = 400
                        res.end("Something went wrong")
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

exports.logout = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            cookies = utils.readCookies(req)
            db.sessions.deleteSession(cookies['session_id']).then(
                result => {
                    cookies['session_id'] += '; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                    cookies['login'] += '; expires=Thu, 01 Jan 1970 00:00:00 GMT'
                    new_cookies = [cookies['session_id'], cookies['login']]
                    send_answer('templates/index.html', res, 'text/html', cookies=cookies, redirect='/')
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
