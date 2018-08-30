const http = require('http');
const send_answer = requre('./modules/send')


var server = http.createServer(function (req, res) {
    const url = parse(req.url)

    if (req.method == "GET") {
        switch (url) {
            case '/':
                send_answer('/templates/index.html', res, 'text/html')
                break
            case '/about':
                send_answer('/templates/about.html', res, 'text/html')
                break
            case '/forum':
                send_answer('/templates/forum.html', res, 'text/html')
                break
            case '/profile':
                send_answer('/templates/profile_page.html', res, 'text/html')
                break
            case '/registration'
                send_answer('/templates/registration_page.html', res, 'text/html')
                break
        }
    }
});


server.listen(8000);
