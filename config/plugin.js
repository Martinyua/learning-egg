/*
 * @Author: Martin
 * @Date: 2020-11-17 19:25:12
 * @LastEditTime: 2020-11-19 15:58:55
 * @FilePath: \egg-app\config\plugin.js
 */
'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  cors: {
    enable:true,
    package: 'egg-cors'
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize'
  },
  valparams: {
    enable : true,
    package: 'egg-valparams'
  }
};
