var clc = require('cli-color'),
  fs = require('fs-extra'),
  util = require('util');

var printLog = function(args, clc){
  console.log('%s - %s', clc(new Date().toISOString()), util.format.apply(null, args));
};


var error = clc.red.bold,
  warn = clc.yellow,
  notice = clc.blue,
  info = clc.greenBright;

var _debug = {
  error: function(){
    printLog(arguments, error);
  },
  warn: function(){
    printLog(arguments, warn);
  },
  info: function(){
    printLog(arguments, info);
  },
  debug: function(){
    printLog(arguments, notice);
  }
}

module.exports = _debug;