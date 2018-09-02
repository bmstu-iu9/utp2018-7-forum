const http = require('http');
const send_answer = require('./modules/send');
const urlapi = require('url')
const db = require('./modules/db')
const reg = require('./modules/registration')
const utils = require('./modules/utils')

db.users.connect()
db.sessions.connect()

var server = http.createServer(function (req, res) {
    const url = urlapi.parse(req.url)

    if (req.method == "GET") {
        if (url.pathname.startsWith('/static')) {
            const filepath = url.pathname.substring(1)
            const filetype = url.pathname.substring(url.pathname.lastIndexOf('.'))
            console.log(filepath, filetype)
            switch (filetype) {
                case '.png':
                    send_answer(filepath, res, 'image/png')
                    break
                case '.js':
                    send_answer(filepath, res, 'text/javascript')
                    break
                case '.css':
                    send_answer(filepath, res, 'text/css')
                default:
                    break
            }
        }
        switch (url.pathname) {
            case '/':
                utils.readCookies(req)
                send_answer('templates/index.html', res, 'text/html')
                break
            case '/about':
                send_answer('templates/about.html', res, 'text/html')
                break
            case '/forum':
                send_answer('templates/forum.html', res, 'text/html')
                break
            case '/profile':
                send_answer('templates/profile_page.html', res, 'text/html')
                break
            case '/registration':
                send_answer('templates/registration_page.html', res, 'text/html')
                break
            default:
                send_answer('templates/404.html', res, 'text/html')
        }
    } else if(req.method == 'POST') {
        switch (url.pathname) {
            case '/auth':
                break
            case '/register':
                reg.registration(req, res)
                break
            default:
                send_answer('templates/404.html', res, 'text/html')
        }
    }
});


server.listen(8000);
