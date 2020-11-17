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

* ```jade
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

