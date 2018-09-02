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

exports.addUser = function(login, password) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, 'utf-8', function(err, db) {
            if (err) {
                console.log('Error while reading db')
                reject(err)
            } else {
                db = JSON.parse(db);

                if (!contains(db, login)) {
                    db.Users.push(new User(login, password))
                    json_db = JSON.stringify(db, '', 4)
                    fs.writeFile(path, json_db, 'utf-8', function(err) {
                        if (err) {
                            console.log('Error while writing to db')
                            reject(err)
                        } else {
                            resolve(true)
                        }
                    })
                } else {
                    reject('User exists')
                }
            }
        })
    })
}

function contains(db, login) {
    var user;
    for (var i = 0; i < db.Users.length; i++)
        if (db.Users[i].login == login)
            user = db.Users[i];
    return user;

}
