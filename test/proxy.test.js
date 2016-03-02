'use strict'

const should = require('should')
    , proxy = require('../proxy/proxy')
    , config = require('../config');

describe('test/proxy.test.js', () => {

  let pageUrl = config.baseUrl + 'channel/list?wp=&page=';

  it('page should be type object', () => {
    let nowPage = 1;
    proxy.getPage(pageUrl + nowPage, nowPage).then((page) => {
      page.should.be.type('object');
    });
  });

  it('page nowPage minPage maxPage should be a Number', () => {
    let nowPage = 1;
    proxy.getPage(pageUrl + nowPage, nowPage).then((page) => {
      page.nowPage.should.be.exactly(nowPage).and.be.a.Number;
      page.minPage.should.be.a.Number;
      page.maxPage.should.be.a.Number;
    });
  });

});
