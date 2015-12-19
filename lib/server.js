var finalhandler = require('finalhandler'),
    http = require('http'),
    serveStatic = require('serve-static'),
    config = require('../config');

var bookserver = function() {
    var serve = serveStatic(__dirname + '/../dest', {
        'index': ['index.htm']
    })
    console.log(__dirname + '/./dest');
    var server = http.createServer(function(req, res) {
        var done = finalhandler(req, res)
        serve(req, res, done)
    })

    server.listen(config.server.port, function() {
        console.log("http://localhost:" + config.server.port);
    })
}

module.exports = bookserver;
