'use strict'

const cheerio = require('cheerio');

/**
* 解析频道列表页的所有频道
*/
let parsePageChannel = (html) => {
  let $ = cheerio.load(html);
  let channels = [];
  $('.channel-cover-wp').each((i, e) => {
      let $e = $(e);
      let channelUrl = $e.find('a').attr('href');
      let id = channelUrl.substring(channelUrl.lastIndexOf('/') + 1);
      channels.push({
        id: id,
        name: $e.text().trim(),
        pic: $e.find('img').attr('src')
      });
  });
  return channels;
}

/**
* 解析用户详情页的用户详情和所有声音
*/
let parseUser = (id, html) => {
  let $ = cheerio.load(html);
  let $user = $('.user-info-wp');
  let voices = parseUserPageVoice($);
  return {
    id: id,
    name: $user.find('.user-name').text(),
    avatar: $user.find('.user-avatar img').attr('src'),
    info: $user.find('.user-info span').text(),
    location: $user.find('.user-info .location').text(),
    voice: $user.find('.voice b').text(),
    follower: $user.find('.follower b').text(),
    followed: $user.find('.followed b').text(),
    is_v: $user.find('.v_certification').text().trim(),
    v_type: $user.find('.v_certification span').text(),
    intro: $user.find('.intro').text().trim(),
    voices: voices
  }
}

/**
* 解析用户页所有声音
*/
let parseUserPageVoice = ($) => {
  let voices = [];
  $('.voices-list .voice-wp').each((i, e) => {
    let $e = $(e);
    let voiceUrl = $e.find('.voice-cover a').attr('href');
    let id = voiceUrl.substring(voiceUrl.lastIndexOf('/') + 1);
    let channelUrl = $e.find('.category a').attr('href');
    let channel_id = channelUrl.substring(channelUrl.lastIndexOf('/') + 1);
    voices.push({
      id: id,
      name: $e.find('.voice-name a').text(),
      pic: $e.find('.voice-cover .voice-cover-wp img').attr('src'),
      length: $e.find('.voice-cover .voice-cover-wp .voice-length').text(),
      share: $e.find('.ui-status .share').text(),
      like: $e.find('.ui-status .like').text(),
      comment: $e.find('.ui-status .comment').text(),
      channel: {
        id: channel_id,
        name: $e.find('.category a').text()
      }
    });
  });
  return voices;
}

/**
* 解析频道详情页的频道详情和所有声音
*/
let parseChannel = (id, html) => {
  let $ = cheerio.load(html);
  let $channel = $('.channel-info');
  let style = $channel.find('style').text();
  let picUrl = style.substring(style.indexOf('(') + 1, style.indexOf(')') + 1);
  let voices = parseChannelPageVoice($);
  return {
    id: id,
    name: $channel.find('.title').text(),
    pic: picUrl,
    info: $channel.find('.intro .ppt').text(),
    voice: $channel.find('.voice').text(),
    follow: $channel.find('.follow').text(),
    share: $channel.find('.share').text(),
    voices: voices
  }
}

/**
* 解析频道页所有声音
*/
let parseChannelPageVoice = ($) => {
  let voices = [];
  $('.voices-list .voice-wp').each((i, e) => {
    if (i === 0) {
      return;
    }
    let $e = $(e);
    let voiceUrl = $e.find('.voice-cover a').attr('href');
    let id = voiceUrl.substring(voiceUrl.lastIndexOf('/') + 1);
    let userUrl = $e.find('.user-avatar a').attr('href');
    let user_id = userUrl.substring(userUrl.lastIndexOf('/') + 1);
    voices.push({
      id: id,
      name: $e.find('.voice-name a').text(),
      pic: $e.find('.voice-cover .voice-cover-wp img').attr('src'),
      length: $e.find('.voice-cover .voice-cover-wp .voice-length').text(),
      share: $e.find('.ui-status .share').text(),
      like: $e.find('.ui-status .like').text(),
      comment:$e.find('.ui-status .comment').text(),
      user: {
        id: user_id,
        name: $e.find('.user-name').text(),
        avatar: $e.find('.user-avatar a img').attr('src')
      }
    });
  });
  return voices;
}

exports.parsePageChannel = parsePageChannel;
exports.parseChannel = parseChannel;
exports.parseUser = parseUser;
