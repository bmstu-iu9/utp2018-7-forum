exports.createHandler = function(f) {
    return new Handler(f)
}

Handler = function(f) {
    this.process = function(req, res) {
        params = null
        return f.apply(this, [req, res, params])
    }
}
