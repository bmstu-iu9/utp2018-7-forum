const fs = require('fs')
const config = require('../../config')
const Session = require('./session')

var path = __dirname + '/sessions.json'
var sessions


exports.connect = function() {
    try {
        console.log('Trying to read sessions.json')
        sessions = JSON.parse(fs.readFileSync(path, 'utf-8'))
    } catch (err) {
        if (err.message.indexOf("ENOENT") == 0) {
            console.log('Creating file with sessions')
            sessions = {"Sessions": [] }
            fs.writeFileSync(path, JSON.stringify(sessions, '', 4), 'utf-8')
        } else console.log(err)
    }
}

exports.getSession = function(id) {
    return new Promise(function(resolve, reject) {
        console.log('Trying to get session with id: ' + id)

        fs.readFile(path, 'utf-8', function(err, db) {
            if (err) {
                console.log(err)
                reject(err)

            } else {
                db = JSON.parse(db);
                resolve(contains(db, id));
            }
        })
    })
}

exports.createSession = function(login) {
    return new Promise(function(resolve, reject) {
        console.log('Creating new session')

        fs.readFile(path, 'utf-8', function(err, db) {
            if (err) {
                console.log('Erro while reading sessions.json')
                reject(err)

            } else {
                db = JSON.parse(db)
                date = new Date().getTime() + 604800
                let session = new Session(generateID(), login, date)
                db.Sessions.push(session);

                json_db = JSON.stringify(db, '', 4)

                fs.writeFile(path, json_db, 'utf-8', function(err) {
                    if (err) {
                        console.log('Error while writing sessions.json')
                        reject(err)
                    } else {
                        console.log('Session created')
                        resolve(session.id)
                    }
                })
            }
        })
    })
}

exports.deleteSession = function(id) {
    return new Promise(function(resolve, reject) {
        console.log('Trying to delete session with id=' + id)
        fs.readFile(path, 'utf-8', function(err, db) {
            if (err) {
                console.log('Error while reading sessions.json')
                reject(err)

            } else {
                db = JSON.parse(db)

                var x = contains(db, id)

                if (!x) {
                    console.log('No user with session id=' + id)
                    reject("No such user")

                } else {
                    db.Sessions.splice(db.Sessions.indexOf(x), 1);
                    json_db = JSON.stringify(db, '', 4)

                    fs.writeFile(path, json_db, 'utf-8', function(err) {
                        if (err) {
                            console.log('Error while writing to sessions.json')
                            reject(err)
                        }
                    })

                    resolve(true)
                }
            }
        })
    })
}

exports.deleteOldSessions = function() {
    return new Promise(function(resolve, reject) {
        console.log('Trying to delete old sessions')
        fs.readFile(path, 'utf-8', function(err, db) {
            if (err) {
                console.log('Error while reading sessions.json')
                reject(err);

            } else {
                db = JSON.parse(db)

                var time = new Date().getTime()
                for (var i = 0; i < db.Sessions.length;) {
                    if (db.Sessions[i].date < time)
                        db.Sessions.splice(i, 1)
                    else
                        i++
                }

                json_db = JSON.stringify(db, '', 4)

                fs.writeFile(path, json_db, 'utf-8', function(err) {
                    if (err) {
                        console.log('Error while writing to sessions.js')
                        reject(err)
                    } else {
                        resolve(true)
                    }
                })
            }
        })
    })
}

exports.deleteAllSessions = function() {
    console.log('Delete all sessions')
    sessions = {"Sessions": []}

    fs.writeFile(path, JSON.stringify(sessions, '', 4), 'utf-8', function(err) {
        if (err)
            console.log('Error while writing to sessions.js')
    });
};


function contains(db, id) {
    var r;
    for (var i = 0; i < db.Sessions.length; i++)
        if (db.Sessions[i].id == id)
            r = db.Sessions[i];
    return r;
}

function generateID() {
    return '_' + Math.random().toString(36).substr(2, config.SESSION_ID_LENGTH)
}
