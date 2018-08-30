const http = require('http');
const router = require('./modules/router');
const db_function = require('./modules/database_functions')

router.register('GET', '/', function(req, res) {
    db_function.connect('users')
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
})

router.register('GET', 'connectToDatabase', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
})

var server = http.createServer(function (req, res) {
  router.route(req, res);
});

// Start it up
server.listen(8000);
