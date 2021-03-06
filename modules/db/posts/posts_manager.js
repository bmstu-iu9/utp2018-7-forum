const db = require('../../db')
const utils = require('../../utils')
const send_answer = require('../../send')

exports.createPost = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            var topic = result.topic
            // TODO: Add check that user exists
            db.posts.createPost(result.author, result.title, result.text, result.topic).then(
                result => {
                    res.writeHead(301, {"Location" : '/' + topic + '/' + result});
                    res.end();
                },
                error => {
                    console.log(error)
                    res.statusCode = 400
                    res.end("Error while creating post")
                }
            )
        },
        error => {
            console.log(error)
            res.statusCode = 400
            res.end("Error while reading body")
        }
    )
}

exports.createCommentToPost = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            console.log(result.post_id, result.topic)
            var path = '/' + result.topic + '/' + result.post_id
            //
            // TODO: Add check that user exists and post
            db.posts.createCommentToPost(result.post_id, result.author, result.text).then(
                result => {
                    res.writeHead(301, {"Location" : path});
                    res.end();
                },
                error => {
                    console.log(error)
                    res.statusCode = 400
                    res.end(error)
                }
            );
        },
        error => {
            console.log(error)
            res.statusCode = 400
            res.end("Error while reading body")
        }
    );
}

exports.getPosts = function(req, res) {
    utils.readBody(req, res).then(
        result => {
            db.posts.getPosts().then(
                result => {
                    console.log(result)
                    res.writeHead(200, {'Content-Type': 'application/json'})
                    res.write(JSON.stringify(result))
                    res.end()
                },
                error => {
                    console.log(error)
                    res.statusCode = 400
                    res.end(error)
                }
            )
        },
        error => {
            console.log(error)
            res.statusCode = 400
            res.end("Error while reading body")
        }
    )
}


