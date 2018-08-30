const fs = require('fs')

path = __dirname + '/files/'

exports.connectToDatabase = function(name) {
    full_path = path + name + '.json'
    try {
        return JSON.parse(fs.readFileSync(full_path, 'utf-8'))
    } catch (err) {
        if (err.message.indexOf('ENOENT') == 0) {
            console.log('Creating database with name ' + name)
            fs.writeFileSync(full_path, JSON.stringify({name: []}, '', 4), 'utf-8')
            return {name: []}
        } else {
            console.log('Error when connecting to database ' + err)
        }
    }
}
