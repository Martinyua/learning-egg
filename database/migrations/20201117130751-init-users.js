/*
 * @Author: Martin
 * @Date: 2020-11-17 21:07:51
 * @LastEditTime: 2020-11-17 21:18:24
 * @FilePath: \egg-app\database\migrations\20201117130751-init-users.js
 */
'use strict';

module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('users', {
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
      sex : {
        type:ENUM,
        values: ['男','女','保密 '],
        allowNull: false,
        defaultValue: '保密',
        comment: '用户性别'
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
