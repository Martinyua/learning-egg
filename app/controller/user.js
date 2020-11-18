/*
 * @Author: Martin
 * @Date: 2020-11-17 19:29:54
 * @LastEditTime: 2020-11-18 21:19:54
 * @FilePath: \egg-app\app\controller\user.js
 */
'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {
        // let res = await this.app.model.User.findAll({
        //     where: {
        //         id: 2,
        //     }
        // })
        let Op = this.app.Sequelize.Op;
        let { User } = this.app.model
        let page = this.ctx.query.page ? this.ctx.query.page : 1
        let limit = 5
        let offset = (page - 1) * limit
        let res = await User.findAll({
            where: {
                sex: '男',
                username: {
                    [Op.like]: "%tin%"
                }
            },
            // attributes:['id','username']
            attributes: {
                exclude: ['password']
            },
            order: [
                ['updated_at', 'DESC'],
                ['id', 'DESC'],
            ],
            offset,
            limit
        })
        this.ctx.body = res
    }
    async read() {
        // let res = this.ctx.params.id
        let id = parseInt(this.ctx.params.id);
        // let res = await this.app.model.User.findByPk(id)
        let res = await this.app.model.User.findOne({
            where: {
                id,
                sex: '女'
            }
        })
        if (!res) {
            return this.ctx.body = {
                msg: 'fail',
                data: "用户不存在"
            }
        }
        this.ctx.body = res
    }
    async create() {
        // let res = await this.app.model.User.create({
        //     username:'martinyu1',
        //     password:'123123'
        // })
        let res = await this.app.model.User.bulkCreate([
            {
                username: 'martinyu22',
                password: '123123',
                sex: '男',
            },
            {
                username: 'martinyu23',
                password: '123123',
                sex: '男',
            },
            {
                username: 'martinyu24',
                password: '123123',
                sex: '男',
            },
            {
                username: 'martinyu25',
                password: '123123',
                sex: '男',
            },
        ])
        this.ctx.body = {
            msg: 'ok',
            res,
        }
    }
    async update() {
        let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
        let data = await this.app.model.User.findByPk(id)

        if (!data) {
            return this.ctx.body = {
                msg: 'fail',
                data: '该记录不存在'
            }
        }

        // data.username = '我被修改了'
        // let res = await data.save()
        let params = this.ctx.request.body
        let res = await data.update(params, {
            fields: ['username']
        })
        this.ctx.body = {
            msg: 'ok',
            data: res
        }
    }
    async destroy() {
        let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 0;
        let data = await this.app.model.User.findByPk(id);
        if (!data) {
            return this.ctx.ctx.body = {
                msg: 'fail',
                data: '该记录不存在'
            }
        }
        let res = await data.destroy()
        this.ctx.body = {
            msg: 'ok',
            data: res
        } 
    }
}

module.exports = UserController;
