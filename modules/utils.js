const qs = require('querystring')


exports.readBody = function(req, res) {
    return new Promise(function(resolve, reject) {
        let body = ''

        req.on('readable', function() {
            let data = req.read()
            if (data != null) {
                body += data
            }
            if (body.length > 1e6) {
                console.log('Body too long')
                res.statusCode = 413;
                res.end('Body too long')
                reject('413: Body too long')
            }
        })
        .on('end', function() {
            console.log(body)
            try {
                if (body) {
                    body = qs.parse(body)
                }
                resolve(body)
            } catch (err) {
                res.statusCode = 400;
                res.end("Can't parse body")
                reject("400: Can't parse body")
            }
        })
    })
}

exports.readCookies = function(req) {
    let cookies = req.headers.cookie
    console.log(cookies)
}
