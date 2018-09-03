const fs = require('fs')
const config = require('../../config')
const Post = require('./post').Post
const Comment = require('./post').Comment

var path = __dirname + '/posts.json'


exports.connect = function() {
    try {
        console.log('Trying to read sessions.json')
        sessions = JSON.parse(fs.readFileSync(path, 'utf-8'))
        console.log('Success read sessions.json')
    } catch (err) {
        if (err.message.indexOf("ENOENT") == 0) {
            console.log('Creating file with sessions')
            sessions = {"Posts": [] }
            fs.writeFileSync(path, JSON.stringify(sessions, '', 4), 'utf-8')
        } else console.log(err)
    }
}

exports.createPost = function(author, title, text) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, 'utf-8', function(err, db) {
            if (err) {
                console.log(err)
                reject(err)

            } else {
                db = JSON.parse(db);

                let post = new Post(Math.random().toString(36).slice(2), author, title, text, new Date().getTime())
                db.Posts.push(post)

                json_db = JSON.stringify(db, '', 4)

                fs.writeFile(path, json_db, 'utf-8', function(err) {
                    if (err) {
                        console.log('Error while writing posts.json')
                        reject(err)
                    } else {
                        resolve(post.id)
                    }
                })
            }
        })
    })
}

exports.createCommentToPost = function(post_id, author, text) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, 'utf-8', function(err, db) {
            if (err) {
                console.log(err)
                reject(err)

            } else {
                db = JSON.parse(db);

                let post_index = get_post(db, post_id)
                if (post_index == -1) {
                    reject('No post with id')
                } else {
                    let comment = new Comment(author, text, new Date().getTime())
                    db.Posts[post_index].comments.push(comment)

                    json_db = JSON.stringify(db, '', 4)

                    fs.writeFile(path, json_db, 'utf-8', function(err) {
                        if (err) {
                            console.log('Error while writing posts.json')
                            reject(err)
                        } else {
                            resolve(true)
                        }
                    })
                }
            }
        })
    })
}

exports.getPosts = function() {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, 'utf-8', function(err, db) {
            if (err) {
                console.log(err)
                reject(err)

            } else {
                db = JSON.parse(db);
                resolve(db)
            }
        })
    })
}

function get_post(db, id) {
    for (var i = 0; i < db.Posts.length; i++) {
        console.log(db.Posts[i].id, id)
        if (db.Posts[i].id == id) {
            return i
        }
    }
    return -1
}
