# echo-API

### 介绍

基于 [koa](https://github.com/koajs/koa) 写的网站 [echo回声](http://www.app-echo.com/) 的API接口

### 运行

```
1. `$ git clone git@github.com:robin22333/echo-API.git`
2. `$ cd echo-API && make install` 安装依赖
3. 修改 config.js 中的 cookie，填上你自己用户登陆后返回的 cookie
4. `$ make test` 测试
5. `$ npm start`
```

### 接口

- 获取当页所有频道
- 获取频道当页所有声音
- 获取用户当页所有声音
- 获取声音详情
