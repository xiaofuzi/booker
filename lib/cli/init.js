var fs = require('fs-extra'),
	log = require('../helper/log');

var rootPath = process.cwd();
	sourcePath = rootPath + '/source',
	configPath = rootPath + 'config.js';


var copy = function(){
	fs.stat(sourcePath, function(err, stats){
		if(stats.isDirectory()){
			log.warn("source directory is existed.")
		}else{
			fs.copy(__dirname + '/../../source', sourcePath, function(err){
            	if (err) throw err;
            	log.info('source init success!');
        	});
		}
	})
	fs.exists(configPath, function(exist){
		if(exist){
			log.warn("config.js is existed.")
		}else{
			fs.copy(__dirname + '/' + '/../../config.js', configPath, function(err){
            	if (err) throw err;
            	log.info('config.js init success!');
        	});
		}
	})
}
module.exports = copy;