const fs = require('fs')
const path = require('path')

module.exports = function(file, res, content, cookies=null) {
    if (fs.existsSync(path.resolve('', file))) {
        html = fs.readFileSync(file)
        to_head = {
            'Content-Type': content
        }
        if cookies {
            to_head['Set-Cookie'] = cookies
        }
        res.writeHead(200, to_head)
        res.end(html)
    } else {
        res.writeHead(404, {'Content-Type': content})
        res.end('404')
        // Return 404 page here
    }
}
