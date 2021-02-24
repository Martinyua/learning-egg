QuickStart
see egg docs for more detail.

Development
$ npm i
$ npm run dev
$ open http://localhost:7001/
Deploy
$ npm start
$ npm stop
npm scripts
Use npm run lint to check code style.
Use npm test to run unit test.
Use npm run autod to auto detect dependencies upgrade, see autod for more detail.

# Egg学习笔记

### 创建控制器

```js
async index(){
    const {ctx} = this;
    //获取路由get传值参数(路由:id)
    ctx.params.id;
     //获取url的问号get传值参数
     ctx.query
     //响应
     ctx.body = '响应'
     //修改状态码
     ctx.status = 201
}
```

### 关闭CSRF开启跨域(测试环境下需要)

* npm i egg-cors --save

* ```js
  //config\config.default.js
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
      allowMethods:'GET,POST,PUT,DELETE,PATCH'
    }
  ```

* ```js
  //plugin.js
    cors: {
      enable:true,
      package: 'egg-cors'
    }
  ```

### 资源路由

### Sequelize

* [文档](https://www.sequelize.com.cn/)

* 安装 : npm install --save egg-sequelize mysql2

* ```js
  //plugin.js
    sequelize: {
      enable: true,
      package: 'egg-sequelize'
    }
  ```

* ```js
   //config\config.default.js
  config.sequelize = {
      dialect: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: '88627',
      port: 3306,
      database: 'fish',
      timezone: '+08:00',
      define: {
        freezeTableName: true,
        timestamps:true,
        createdAt:'created_at',
        updatedAt:'updated_at',
        //所有驼峰命名格式化
        underscored:true
      }
    }
  ```

  #### 数据库迁移：

- npm install --save-dev sequelize-cli

* 在 egg 项目中，我们希望将所有数据库 Migrations 相关的内容都放在 `database` 目录下，所以我们在项目根目录下新建一个 `.sequelizerc` 配置文件：

  ```js
  'use strict';
  
  const path = require('path');
  
  module.exports = {
    config: path.join(__dirname, 'database/config.json'),
    'migrations-path': path.join(__dirname, 'database/migrations'),
    'seeders-path': path.join(__dirname, 'database/seeders'),
    'models-path': path.join(__dirname, 'app/model'),
  };
  ```

* 初始化 Migrations 配置文件和目录

```
npx sequelize init:config
npx sequelize init:migrations
```

* 执行完后会生成 `database/config.json` 文件和 `database/migrations` 目录，我们修改一下 `database/config.json` 中的内容，将其改成我们项目中使用的数据库配置：

* ```js
  {
    "development": {
      "username": "root",
      "password": "88627",
      "database": "eggapi",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "timezone": "+08:00",
      "operatorsAliases": false
    },
    "test": {
      "username": "root",
      "password": "88627",
      "database": "eggapi",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "timezone": "+08:00",
      "operatorsAliases": false
    },
    "production": {
      "username": "root",
      "password": "88627",
      "database": "eggapi",
      "host": "127.0.0.1",
      "dialect": "mysql",
      "timezone": "+08:00",
      "operatorsAliases": false
    }
  }
  ```


- 创建数据迁移表

- ```js
  npx sequelize migration:generate --name=init-users
  ```

- 执行完后会在 `database/migrations` 目录下生成一个 migration 文件(`${timestamp}-init-users.js`)，我们修改它来处理初始化 `users` 表：

  ```js
      'use strict';
  
      module.exports = {
        // 在执行数据库升级时调用的函数，创建 users 表
        up: async (queryInterface, Sequelize) => {
          const { INTEGER, DATE, STRING } = Sequelize;
          await queryInterface.createTable('users', {
            id: { type: INTEGER, 
                 primaryKey: true, 
                 autoIncrement: true },
            name: STRING(30),
            age: INTEGER,
            created_at: DATE,
            updated_at: DATE,
          });
        },
        // 在执行数据库降级时调用的函数，删除 users 表
        down: async queryInterface => {
          await queryInterface.dropTable('users');
        },
      };
  ```

- 执行 migrate 进行数据库变更

- ```
    # 升级数据库
    npx sequelize db:migrate
    # 如果有问题需要回滚，可以通过 `db:migrate:undo` 回退一个变更
    # npx sequelize db:migrate:undo
    # 可以通过 `db:migrate:undo:all` 回退到初始状态
    # npx sequelize db:migrate:undo:all
    ```

#### model（app/model/user.js)

```js
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
            unique: true
        },
        password: {
            type: STRING(30),
            allowNull: false,
            defaultValue: ''
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
        created_at: DATE,
        updated_at: DATE,
    });
    return User
}
```

#### 新增

* 模型新增**：this.app.model.User.creat({})

  ```
  await this.app.model.User.create({
              username:'martinyu1',
              password:'123123'
          })
  ```

* **批量新增**：this.app.model.User.bulkCreate([{ }])

* **修改器:**在数据写入的时候操作数据，比如说数据加密

  ```js
  //app/model/user.js
  
  age:{
      type:INTEGER,
      set(val){
          this.setDataValue('age',val *10);
      }
  }
  ```

#### 查询

* **查询单个数据**

  * this.app.model**.findByPk()** //通过主键查询单个数据

  * **findOne()** //通过where查找单个

    ```js
            let res = await this.app.model.User.findOne({
                where: {
                    id,
                    sex: '女'
                }
            })
    ```

* **查询多个** 

  * **findAll()** 。如果不传则查询所有

  * ```js
            let res = await this.app.model.User.findAll({
                where: {
                    id: 2,
                }
            })
    ```

    

  * **findAndCountAll**()，查询并且计算所有数据数

  * **获取器** ：拿到数据前将数据处理并且返回，比如返回时间戳

    ```
    //app/model/User.js
    created_at: {
        type:DATE,
        get(){
        const val = this.getDataValue('created_at');
        return (new Date(val)).getTime()
        }
    },
    ```
 #### where，查询指定，排序，分页

  * **where** 条件查询

    * 利用**Op**进行高级查询，比如模糊查询，大于小于，不包含，或，且，范围查询等等见文档[Op用法](https://www.sequelize.com.cn/core-concepts/model-querying-basics)

      ```js
      let res = await User.findAndCountAll({
          where: {
              sex:'男',
              username:{
                  [Op.like]: "%tin%"
              }
          }
      })
      ```

  * 查询指定属性 attributes

    ```
    attributes:['id','username'] //查询指定
    attributes:{
    	exclude:['password']
    } //除了该属性都查询
    ```

  * 排序 order: 

    ```
    order:[
        ['order','DESC'] //降序
    ]
    ```

  * 分页

    * limit（数据数量)

    * offset( 偏移量 ：数据开始值)

      ```js
      let page = this.ctx.query.page ? this.ctx.query.page : 1
      let limit = 5
      let offset = (page - 1) * limit
      
      findAll({
          page:page,
          offset:offset
      })
      ```

#### 修改

* 修改：方法一：先拿到数据，修改后调用**await data.save()**

  ```js
      async update() {
          let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 1;
          let data = await this.app.model.User.findByPk(id)
  
          if(!data){
              return this.ctx.body = {
                  msg:'fail',
                  data:'该记录不存在'
              }
          }
          data.username = '我被修改了'
          let res = await data.save()
          this.ctx.body = res
      }
  ```

* 方法二：拿到data后，通过调用**await data.update()**传入对象的形式修改，可通过fields来限制可修改的字段
  ```js
        async update() {
            let id = this.ctx.params.id ? parseInt(this.ctx.params.id) : 1;
            let data = await this.app.model.User.findByPk(id)
            let params = this.ctx.request.body
            let res = await data.update(params,{
                fields:['username']
            })
            this.ctx.body = {
                msg:'ok',
                data:res
            }
        }
  ```

#### 删除

* 删除：拿到data，然后调用 **await data.destroy()**

  ```js
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
  ```

* 批量删除：调用 **await data.destroy()** 时传入**where**条件

  ```js
  await this.app.model.User.destroy({
      where:{
          id:{
              [Op.lte]: 7
          }
      }
  })
  ```


### 错误处理

* 全局错误处理

* 新建一个middleware文件夹

  ```js
  //middleware/error_handler.js
  module.exports = (option, app) => {
      return async function errorHandler(ctx, next) {
          try {
              await next()
          } catch (error) {
              //所有的异常都在app上触发一个error事件，框架会记录一条错误日志
              ctx.app.emit('error', error, ctx)
              //数据库报错
              if(error.name === "SequelizeUniqueConstraintError"){
                  return ctx.body = {
                      msg: 'fail',
                      data:error.errors[0].message
                  }
              }
              //参数错误
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
  ```

* ```js
  // config/config.default.js下注册
  // add your middleware config here
  config.middleware = ['errorHandler'];
  ```

### 中间件配置

* ```js
  // config/config.default.js下注册
  // add your middleware config here
  config.middleware = ['errorHandler'];
  
  config.errorHandler = {
      //通用配置
      enable: true,
      match: '/news',//设置只有符合某些规则的请求才会经过这个中间件
      ignore: '/shop',//设置符合某些规则的请求不会经过这个中间件
      //match: ["/user/list"] //如果有多个可以配置为数组
  }
  
  ```

### 参数验证

* 写入数据库之前进行参数验证

* [api文档](https://github.com/D780/valparams/blob/master/doc/api.md)

* ```
  npm i egg-valparams --save
  ```

  ```js
  // config/plugin.js
  valparams: {
      enable : true,
      package: 'egg-valparams'
  }
  
  // config/config.default.js
  config.valparams = {
      locale: 'zh-cn',
      throwError: true //是否主动抛出异常
  };
  ```

  ```js
  //使用
  class XXXController extends app.Controller {
    // ...
    async XXX() {
      const {ctx} = this;
      ctx.validate({
        system  : {                                                                                        : 'string', required: false, defValue: 'account', desc: '系统名称'},
        token   : {type: 'string', required: true, desc: 'token 验证'},
        redirect: {type: 'string', required: false, desc: '登录跳转'}
      });
      // if (config.throwError === false)
      if(ctx.paramErrors) {
        // get error infos from `ctx.paramErrors`;
      }
      let params = ctx.params;
      let {query, body} = ctx.request;
      // ctx.params        = validater.ret.params;
      // ctx.request.query = validater.ret.query;
      // ctx.request.body  = validater.ret.body;
      // ...
      ctx.body = query;
    1
    // ...
  }
  ```

  * 抛出错误的状态码为 422 ，需要做全局错误处理  

    ```js
    ctx.status = error.status;
        if (ctx.status === 422) {
        return ctx.body = {
        msg: 'fail',
        data: error.errors 
        }
    }
    ```

    



