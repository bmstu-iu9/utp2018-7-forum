var fs = require("fs");
var contents = fs.readFileSync("../../modules/db/posts/posts.json");
var jsonContent = JSON.parse(contents);