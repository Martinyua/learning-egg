/*
 * @Author: Martin
 * @Date: 2020-11-19 15:22:46
 * @LastEditTime: 2020-11-19 16:56:15
 * @FilePath: \egg-app\app\middleware\error_handler.js
 */
module.exports = (option, app) => {
    return async function errorHandler(ctx, next) {
        try {
            await next()
        } catch (error) {
            //所有的异常都在app上触发一个error事件，框架会记录一条错误日志
            ctx.app.emit('error', error, ctx)
            if(error.name === "SequelizeUniqueConstraintError"){
                return ctx.body = {
                    msg: 'fail',
                    data:error.errors[0].message
                }
            }
            ctx.status = error.status;
            if (ctx.status === 422) {
                return ctx.body = {
                    msg: 'fail',
                    data: error.errors 
                }
            }
            ctx.body = {
                msg: 'fail',
                data: error.message
            }
        }
    }
}