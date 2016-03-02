'use strict'

const superagent = require('superagent')
    , cheerio = require('cheerio')
    , url = require('url')
    , config = require('../config')
    , logger = require('../common/logger')
    , tools = require('../common/tools');

let getPage = (pageUrl, nowPage) => {
  return new Promise((relsove, reject) => {
    superagent.get(pageUrl)
      .set('Cookie', config.cookie)
      .end((err, res) => {
        if (err) {
            return reject(err);
        }
        let $ = cheerio.load(res.text);
        let minPage = Number($('.pagination li').eq(1).find('a').text());
        let maxPage = Number($('.pagination li').eq($('.pagination li').length - 2).find('a').text());
        let jsonObj = {
          nowPage: nowPage,
          minPage: minPage,
          maxPage: maxPage
        };
        relsove(jsonObj);
    });
  });
}

/**
* 抓取当页的所有频道
* return Promise
*/
let getPageChnnel = (page) => {
  let pageUrl = config.baseUrl + 'channel/list?wp=&page=' + page.nowPage;
  return new Promise((relsove, reject) => {
    superagent.get(pageUrl)
      .set('Cookie', config.cookie)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        let channels = tools.parsePageChannel(res.text);
        let jsonObj = {
          state: 1,
          message: 'success',
          result: {
            nowPage: page.nowPage,
            minPage: page.minPage,
            maxPage: page.maxPage,
            channels: channels
          }
        };
        relsove(jsonObj);
      });
  });
}

/**
* 抓取频道页数据
* return Promise
*/
let getChannelPageVoice = (channel_id, page) => {
  let pageUrl = config.baseUrl + 'channel/' + channel_id + '?page=' + page.nowPage;
  return new Promise((relsove, reject) => {
    superagent.get(pageUrl)
      .set('Cookie', config.cookie)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        let channel = tools.parseChannel(channel_id, res.text);
        let jsonObj = {
          state: 1,
          message: 'success',
          result: {
            nowPage: page.nowPage,
            minPage: page.minPage,
            maxPage: page.maxPage
          }
        };
        jsonObj.result[channel_id] = channel;
        relsove(jsonObj);
      });
  });
}

/**
* 抓取用户页数据
*/
let getUserPageVoice = (user_id, page) => {
  let pageUrl = config.baseUrl + 'user/' + user_id + '?page=' + page.nowPage;
  return new Promise((relsove, reject) => {
    superagent.get(pageUrl)
      .set('Cookie', config.cookie)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        let user = tools.parseUser(user_id, res.text);
        let jsonObj = {
          state: 1,
          message: 'success',
          result: {
            nowPage: page.nowPage,
            minPage: page.minPage,
            maxPage: page.maxPage
          }
        };
        jsonObj.result[user_id] = user;
        relsove(jsonObj);
      });
  });
}

/**
* 抓取声音详情
* return Promise
*/
let getVoiceDetail = (sound_id) => {
  let detail_url = config.baseUrl + 'sound/detail?ids=%5B' + sound_id + '%5D&wp';
  return new Promise((relsove, reject) => {
    superagent.get(detail_url)
      .set('Cookie', config.cookie)
      .end((err, res) => {
        if (err) {
          return reject(err);
        }
        let jsonObj = JSON.parse(res.text);
        relsove(jsonObj);
      });
  });
}

exports.getPage = getPage;
exports.getPageChnnel = getPageChnnel;
exports.getChannelPageVoice = getChannelPageVoice;
exports.getUserPageVoice = getUserPageVoice;
exports.getVoiceDetail = getVoiceDetail;
