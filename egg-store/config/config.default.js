/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
//   config.security = {
//      csrf : {
//       enable: false,
//     }
//  }
  config.view={
    mapping:{
      '.html':'ejs'
    }
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1637165108173_412';

  // add your middleware config here
  config.middleware = [];

  config.api = 'http://www.phonegap100.com/appapi.php?'
  config.middleware = ['adminauth']
  config.forbidip={
    ip:['127.0.0.1']
  }
  config.session = {
    key:'SESSION_ID',
    maxAge:864000,
    httpOnly:true,
    encrypt: true,
    renew:true //renew为true 每次刷新session 都会被延期
  }
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  //配置mongose连接mongodb数据库
  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1:27018/testdb',
      options: {}
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
