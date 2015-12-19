var watch = require('watch'),
    log = require('../helper/log'),
    bookerRender = require('../render'),
    path = require('path');


/*
 * global data
 */
var rootPath = process.cwd(),
    sourcePath = rootPath + '/' + 'source';

var reRender = function() {
    watch.watchTree(sourcePath, function(f, curr, prev) {
        if (typeof f == "object" && prev === null && curr === null) {
            log.info('generate success.');
        } else if (prev === null) {
            // f is a new file
        } else if (curr.nlink === 0) {
            // f was removed
        } else {
            // f was changed
            bookerRender(f);
            log.info(path.basename(f) + ' generate again.');
        }
    })
}

module.exports = reRender;
