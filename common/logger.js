'use strict'

var c = require('colors');
var fs = require('fs');

c.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

exports.log = function() {
  writeLog('', 'info', arguments);
}

exports.info = function() {
  writeLog('  ', 'info', arguments);
}

exports.debug = function() {
  writeLog('  ', 'debug', arguments);
}

exports.warn = function() {
  writeLog('  ', 'warn', arguments);
}

exports.error = function() {
  writeLog('  ', 'error', arguments);
}

let writeLog = (prefix, logType, args) => {
  // args to array
  let infos = Array.prototype.slice.call(args);
  let logStr = infos.join('  ');

  switch (logType) {
  case 'info':
    logStr = logStr.info;
    break;
  case 'debug':
    logStr = logStr.debug;
    break;
  case 'warn':
    logStr = logStr.warn;
    break;
  case 'error':
    logStr = logStr.error;
    break;
  }

  let line = prefix + logStr;

  console.log(line);
}
