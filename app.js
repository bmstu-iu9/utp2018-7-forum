const http = require('http');
const router = require('./modules/router');

router.register('GET', '/', function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World');
})

var server = http.createServer(function (req, res) {
  router.route(req, res);
});

// Start it up
server.listen(8000);
