const { app } = require("egg-mock");

/*
 * @Author: Martin
 * @Date: 2020-11-18 17:02:21
 * @LastEditTime: 2020-11-18 19:16:53
 * @FilePath: \egg-app\app\model\user.js
 */
module.exports = app => {
    const { INTEGER, DATE, STRING, ENUM } = app.Sequelize;
    const User = app.model.define('users', {
        id: {
            type: INTEGER(20),
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: STRING(30),
            allowNull: false,
            defaultValue: '',
            comment: '用户名称',
            unique: true,
        },
        password: {
            type: STRING(30),
            allowNull: false,
            defaultValue: '',
            set(val){
                let hash = val + '123456'
                this.setDataValue('password',hash)
            }
        },
        avatar_url: {
            type: STRING(200),
            allowNull: false,
            defaultValue: ''
        },
        sex: {
            type: ENUM,
            values: ['男', '女', '保密 '],
            allowNull: false,
            defaultValue: '保密',
            comment: '用户性别'
        },
        created_at: {
            type:DATE,
            get(){
                const val = this.getDataValue('created_at');
                return (new Date(val)).getTime()
            }
        },
        updated_at:  {
            type:DATE,
            get(){
                const val = this.getDataValue('updated_at');
                return (new Date(val)).getTime()
            }
        },
    });
    return User
}