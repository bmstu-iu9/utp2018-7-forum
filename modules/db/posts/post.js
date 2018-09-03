function Comment(author, text, date) {
    this.author = author
    this.text = text
    this.date = date
}

function Post(id, author, title, text, date) {
    this.id = id
    this.author = author
    this.title = title
    this.text = text
    this.date = date
    this.comments = []
}

module.exports.Post = Post
module.exports.Comment = Comment
