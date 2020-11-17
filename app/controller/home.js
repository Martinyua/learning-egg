/*
 * @Author: Martin
 * @Date: 2020-11-17 19:25:12
 * @LastEditTime: 2020-11-17 19:29:30
 * @FilePath: \egg-app\app\controller\home.js
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, Martinyu';
  }
  async list() {
    this.ctx.body='list'
  }
}

module.exports = HomeController;
