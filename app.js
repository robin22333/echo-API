'use strict'

const koa = require('koa')
    , router = require('koa-router')()
    , onerror = require('koa-onerror')
    , requestLog = require('./middlewares/request_log')
    , execTime = require('./middlewares/exec_time')
    , api = require('./routes/api')
    , config = require('./config')
    , logger = require('./common/logger');

let app = koa();

onerror(app);

// log execution time
app.use(execTime);
// log request
app.use(requestLog);

router.use('/', api.routes(), api.allowedMethods());
app.use(router.routes());

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

app.listen(3000, () => {
  logger.log('server listening on port', config.port);
  logger.log('');
});
