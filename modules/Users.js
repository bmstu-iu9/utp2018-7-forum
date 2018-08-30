var fs = require('fs');
var User = require('./User');


var path = __dirname + '/users.json';

var users;


exports.connect = function() {
    try {
        users = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (err) {
        if (err.message.indexOf("ENOENT") == 0) {
            log.info("Создание файла с юзерами");
            fs.writeFileSync(path, JSON.stringify({ "Users": [] }, '', 4), 'utf-8');
        } else log.error(err);
        users = { "Users": [] };
    }
};


exports.readDB = function(login){
    readDB.then(
        result => {
            db = result;
        },
        error => {
            console.log(error);
        }
    )
}


readDB = function() {
    return new Promise(function(res, rej) {
        fs.readFile(path, 'utf-8', function (err, db) {
            if (err) {
                rej(err);
            } else {
                db = JSON.parse(db);
                res(db);
            }
        });
    });
};

writeDB = function(){
    return new Promise (function(res, rej){
        fs.writeFile(path, db, 'utf-8', function(err){
            if (err){
                rej(err);
            }
        });
    });
}



exports.addNewUser = function(login, password){
    readDB.then(
        result => {
            return new Promise(function(resolve, reject) {
                db = result;

                if (!contain(db, login)) {
                    db.Users.push(new User(login, password));
                    db = JSON.stringify(db, '', 4);

                    writeDB.then(result =>{
                            resolve(true)
                        },
                        error => {
                            console.log(error);
                        })
                }
            });
        },
        error => {
            console.log(error);
        }
    )
}

exports.deleteUser = function(login){
    readDB.then(
        result => {
            return new Promise (function(resolve, reject){
                db = result;
                var curUser = contain(db, login);
                if (curUSer != -1){
                    db.Users.splice(db.Users[curUser], 1);
                    db = JSON.stringify(db, '', 4);
                    writeDB.then(result => {
                            resolve(true)
                        },
                        error => {
                            console.log(error);
                        })
                }

            });
        }
    )
}



function contain(db, login) {
    var user;
    for (var i = 0; i < db.Users.length; i++)
        if (db.Users[i].login == login)
            user = db.Users[i];
    return user;

}

