const http = require('http');
const send_answer = require('./modules/send');
const urlapi = require('url')
const db = require('./modules/db')
const reg = require('./modules/registration')
const auth = require('./modules/authorization')
const utils = require('./modules/utils')

db.users.connect()
db.sessions.connect()
db.posts.connect()

var topic;


var server = http.createServer(function (req, res) {
    const url = urlapi.parse(req.url)

    if (req.method == "GET") {
        if (url.pathname.startsWith('/static')) {
            const filepath = url.pathname.substring(1)
            const filetype = url.pathname.substring(url.pathname.lastIndexOf('.'))

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
            case '/logout':
                auth.logout(req, res)
                break
            case '/news/create_thread':
                send_answer('templates/create_thread.html', res, 'text/html')
                topic = 'news';
                break
            case '/fluff/create_thread':
                send_answer('templates/create_thread.html', res, 'text/html')
                break
            case '/known_bugs/create_thread':
                send_answer('templates/create_thread.html', res, 'text/html')
                break
            case '/general_discussion/create_thread':
                send_answer('templates/create_thread.html', res, 'text/html')
                break
            case '/news':
                send_answer('templates/news.html', res, 'text/html')
                break
            case '/known_bugs':
                send_answer('templates/known_bugs.html', res, 'text/html')
                break
            case '/general_discussion':
                send_answer('templates/general_discussion.html', res, 'text/html')
                break
            case '/fluff':
                send_answer('templates/Fluff.html', res, 'text/html')
                break
            case '/posts':
                db.posts_manager.getPosts(req, res)
                break
            case '/thread':
                send_answer('templates/thread.html', res, 'text/html')
                break
            default:
                send_answer('templates/404.html', res, 'text/html')
        }
    } else if(req.method == 'POST') {
        switch (url.pathname) {
            case '/auth':
                auth.authorize(req, res)
                break
            case '/register':
                reg.registration(req, res)
                break
            case '/posts/add-comment':
                db.posts_manager.createCommentToPost(req, res)
                break
            case '/posts/create':
                db.posts_manager.createPost(req, res);
                break;
            default:
                send_answer('templates/404.html', res, 'text/html')
        }
    }
});


server.listen(8000);

console.log('Server started on port 8000')
