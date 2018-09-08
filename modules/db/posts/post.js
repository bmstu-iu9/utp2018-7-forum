function Comment(author, text, date) {
    this.author = author
    this.text = text
    this.date = date
}

function Post(id, author, title, text, date, topic) {
    this.id = id
    this.author = author
    this.title = title
    this.text = text
    this.date = date
    this.comments = []
    this.topic = topic
}

module.exports.Post = Post
module.exports.Comment = Comment
