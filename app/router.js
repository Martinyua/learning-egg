/*
 * @Author: Martin
 * @Date: 2020-11-17 19:25:12
 * @LastEditTime: 2020-11-18 21:07:49
 * @FilePath: \egg-app\app\router.js
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/list', controller.home.list);

  router.get('/user/index',controller.user.index)
  router.get('/user/read/:id',controller.user.read)


  router.post('/user/create',controller.user.create)
  router.post('/user/update/:id',controller.user.update)
  router.post('/user/delete/:id',controller.user.destroy)
};
