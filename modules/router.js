const handlerFactory = require('./handler')
const fs = require('fs')
const path = require('path')
const url = require('url');

var handlers = {
    'GET': {},
    'POST': {},
    'PUT': {},
}

exports.clear = function() {
    handlers = {}
}

exports.register = function(method, url, f) {
    try {
        handlers[method][url] = handlerFactory.createHandler(f)
    } catch (e) {}
}

exports.route = function(req, res) {
    try {
        handlers[req.method][req.url].process(req, res)
    } catch (e) {
        this.missing(req).process(req, res)
    }
}

exports.missing = function(req) {
    // Add static files handler
    var parsedUrl = url.parse(req.url, true)
    if (req.method == 'GET') {
        full_path = path.resolve('templates', parsedUrl.path.substr(1))
        if (fs.existsSync(full_path)) {
            return handlerFactory.createHandler(function(req, res) {
                html = fs.readFileSync(full_path)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.end(html)
            })
        }
    }
    return handlerFactory.createHandler(function(req, res) {
        html = fs.readFileSync(path.resolve('templates', '404.html'))
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end(html)
    })
}
