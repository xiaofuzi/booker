var fs = require('fs-extra'),
    path = require('path'),
    log = require('./log');

var fsDeep = {
    readDirRecur: function(file, callback) {
        fs.readdir(file, function(err, files) {
        	if(err) throw err;
            files.forEach(function(item) {
            	var fullPath = file + '/' + item;
                fs.stat(fullPath, function(err, stats) {
                    if (err) throw err;
                    if (stats.isDirectory()) {
                        fsDeep.readDirRecur(fullPath, callback);
                    }else{
                    	/*not use ignore files*/
                    	if(item[0] == '.'){
                    		//console.log(item + ' is a hide file.');
                    	}else{
                    		fs.readFile(fullPath, 'utf8', function(err, data){
                                callback(item, data, fullPath);
                            })
                    	}
                    }
                })
            },
            function(err){
            	if(err) throw err;
            })
        })
    },
    write: function(file, data, callback) {
        fs.ensureFile(file, function(err) {
            if (err) throw err;
            fs.writeFile(file, data, callback);
        })
    },
    copy: function(src, dest, callback) {
        fs.copy(src, dest, true, function(err){
            if (err) throw err;
            callback(err);
        });
    },
    cleanDir: function(file, callback) {
        fs.emptyDir(file, function(err) {
            if (err) throw err;
            console.log('clean success!')
            callback();
        })
    },
    isExistSync: function(file, callback){
        if(fs.existsSync(file)){
            return ture;
        }else{
            return false;
        }
    }, 
    isExist: function(file, callback){
        fs.statSync(file, function(err, stats){
            if(stats.isFile()){
                callback(file);
            }else{
                log.warn(file + ' is not found!');
            }
        });
    }
}

module.exports = fsDeep;
