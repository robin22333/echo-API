'use strict'

const logger = require('../common/logger');

module.exports = function* (next) {
  if (this.url.indexOf('favicon.ico') !== -1) {
    yield next;
    return;
  }
  let start_at = Date.now();
  yield next;
  let duration = Date.now() - start_at;
  logger.log(this.method, this.url, duration + 'ms');
}
