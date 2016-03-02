'use strict'

const router = require('koa-router')()
    , proxy = require('../proxy/proxy')
    , config = require('../config');

router.get('/', function* (next) {

  this.set('Content-Type', 'application/json;charset=UTF-8');

  yield next;

});

router.get('channel/list', function* (next) {

  let nowPage = Number(this.query.nowPage) || 1;
  if (nowPage < 1) nowPage = 1;
  let pageUrl = config.baseUrl + 'channel/list?wp=&page=' + nowPage;

  let page = yield proxy.getPage(pageUrl, nowPage);
  let pageChannel = yield proxy.getPageChnnel(page);

  yield this.body = pageChannel;

});

router.get('channel/:id', function* (next) {

  let channel_id = this.params.id;
  let nowPage = Number(this.query.nowPage) || 1;
  if (nowPage < 1) nowPage = 1;
  let pageUrl = config.baseUrl + 'channel/' + channel_id + '?page=' + nowPage;

  let page = yield proxy.getPage(pageUrl, nowPage);
  let channelPageVoice = yield proxy.getChannelPageVoice(channel_id, page);

  yield this.body = channelPageVoice;

});

router.get('user/:id', function* () {

  let user_id = this.params.id;
  let nowPage = Number(this.query.nowPage) || 1;
  if (nowPage < 1) nowPage = 1;
  let pageUrl = config.baseUrl + 'user/' + user_id + '?page=' + nowPage;

  let page = yield proxy.getPage(pageUrl, nowPage);
  let userPageVoice = yield proxy.getUserPageVoice(user_id, page);

  yield this.body = userPageVoice;

});

router.get('sound/:id', function* () {

  let sound_id = this.params.id;

  let voiceDetail = yield proxy.getVoiceDetail(sound_id);

  yield this.body = voiceDetail;

});

module.exports = router;
