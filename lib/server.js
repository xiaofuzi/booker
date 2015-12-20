var finalhandler = require('finalhandler'),
    http = require('http'),
    serveStatic = require('serve-static'),
    path = require('path'),
    log = require('./helper/log');

var rootPath = process.cwd(),
    config = require(rootPath + '/config');


var subdirServer = function(req, res){
    if(config.server.subdir){
        var subdirPath = path.join(path.sep, config.server.subdir, path.sep);

        req.url = req.url.replace(new RegExp(subdirPath), '');
    }
}

var bookserver = function() {
    var serve = serveStatic(rootPath + '/dest', {
        'index': ['index.htm']
    })
    var server = http.createServer(function(req, res) {
        var done = finalhandler(req, res)
        if(req.url == '/'){
            req.url = '/index.html';
        }
        subdirServer(req, res);
        serve(req, res, done);
    })

    server.listen(config.server.port, function() {
        console.log("http://localhost:" + config.server.port);
    })
}

module.exports = bookserver;
