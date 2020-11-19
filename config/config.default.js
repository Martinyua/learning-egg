/*
 * @Author: Martin
 * @Date: 2020-11-17 19:25:12
 * @LastEditTime: 2020-11-19 16:45:06
 * @FilePath: \egg-app\config\config.default.js
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605612287270_9205';

  // add your middleware config here
  config.middleware = ['errorHandler'];
  config.errorHandler = {
    //通用配置
    enable: true, //是否开启中间件  
    //match: '/news',//设置只有符合某些规则的请求才会经过这个中间件
    //ignore: '/shop',//设置符合某些规则的请求不会经过这个中间件
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  //关闭csrf开启跨域
  config.security = {
    csrf: {
      enable: false,
    },
    //跨域白名单
    domainWhiteList: ['http://localhost:3000']
  }
  config.cors = {
    origin: '*',
    allowMethods: 'GET,POST,PUT,DELETE,PATCH'
  }
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: 'py88627',
    port: 3306,
    database: 'eggapi',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      //所有驼峰命名格式化
      underscored: true
    }
  }

  config.valparams = {
    locale: 'zh-cn',
    throwError: true
  };

  return {
    ...config,
    ...userConfig,
  };
};
