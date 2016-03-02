'use strict'

const logger = require('../common/logger');

module.exports = function* (next) {
  let start_at = Date.now();
  yield next;
  this.set('X-Execution-Time', Date.now() - start_at);
}
