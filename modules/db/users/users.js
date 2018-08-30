const fs = require('fs');
const User = require('./user');


var path = __dirname + '/users.json';
var users;

exports.connect = function() {
    try {
        users = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (err) {
        if (err.message.indexOf("ENOENT") == 0) {
            console.log('Creating database with users');
            users = { "Users": [] };
            fs.writeFileSync(path, JSON.stringify(users, '', 4), 'utf-8');
        } else log.error(err);
    }
};

exports.readDB = function() {
    return new Promise(function(res, rej) {
        fs.readFile(path, 'utf-8', function (err, db) {
            if (err) {
                rej(err);
            } else {
                res(JSON.parse(db));
            }
        });
    });
}

exports.updateDB = function(db) {
    return new Promise (function(res, rej) {
        json_db = JSON.stringify(db, '', 4)
        fs.writeFile(path, json_db, 'utf-8', function(err) {
            if (err) {
                console.log('Error while updating to database ' + error);
                rej(err);
            }
        });
    });
}

exports.addNewUser = function(login, password) {
    return new Promise(function(resolve, reject) {
        readDB.then(
            result => {
                db = result

                if (!contains(db, login)) {
                    db.Users.push(new User(login, password))
                    updateDB(db).then(
                        result => {
                            resolve(true)
                        },
                        error => {
                            reject(error)
                        }
                    )
                }
            },
            error => {
                console.log('Error while adding new user ' + error)
                reject(error)
            }
        )
    });

}

exports.deleteUser = function(login) {
    return new Promise (function(resolve, reject){
        readDB.then(
            result => {
                db = result;

                var currentUser = contains(db, login)
                if (currentUser != -1) {
                    db.Users.splice(db.Users[currentUser], 1)
                    updateDB(db).then(
                        result => {
                            resolve(true)
                        },
                        error => {
                            reject(error)
                        }
                    )
                }
            },
            error {
                console.log('Error while delete user ' + error)
                reject(error)
            }
        )
    });
}

function contains(db, login) {
    var user;
    for (var i = 0; i < db.Users.length; i++)
        if (db.Users[i].login == login)
            user = db.Users[i];
    return user;

}
