/*
 * @Author: Martin
 * @Date: 2020-11-17 19:29:54
 * @LastEditTime: 2020-11-17 20:45:34
 * @FilePath: \egg-app\app\controller\user.js
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    demo = [
        {
            id: 1,
            username: 'martinyu',
            password: '123'
        }, {
            id: 2,
            username: 'martinyu',
            password: '123'
        }, {
            id: 3,
            username: 'martinyu',
            password: '123'
        },
    ]
    async index() {
        let res = this.demo
        this.ctx.body = res
    }
    async read() {
        // let res = this.ctx.params.id
        let res = this.ctx.query.page
        this.ctx.body = res
        this.ctx.status = 201
    }
    async create() {
        let res = this.ctx.request.body
        this.ctx.body = {
            msg: 'ok',
            res,
        }
    }
}

module.exports = UserController;
