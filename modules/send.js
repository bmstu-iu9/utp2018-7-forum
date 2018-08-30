const fs = require('fs')
const path = require('path')

module.exports = function(file, res, content) {
    if (fs.existsSync(path.resolve('', file))) {
        html = fs.readFileSync(file)
        res.writeHead(200, {'Content-Type': content})
        res.end(html)
    } else {
        res.writeHead(404, {'Content-Type': content})
        res.end('404')
        // Return 404 page here
    }
}
