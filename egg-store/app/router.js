'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  //验证码
  router.get('/admin/verify', controller.admin.base.verify);
  // 删除
  router.get('/admin/delete', controller.admin.base.delete);
  router.get('/admin/changeStatus', controller.admin.base.changeStatus);

  
  router.get('/admin/login', controller.admin.login.index);
  router.post('/admin/doLogin', controller.admin.login.doLogin);
  router.get('/admin/loginOut', controller.admin.login.loginOut);

  
  router.get('/admin/manager',controller.admin.manager.index)
  router.get('/admin/manager/add',controller.admin.manager.add)
  router.get('/admin/manager/edit',controller.admin.manager.edit)
  router.post('/admin/manager/doAdd',controller.admin.manager.doAdd)
  router.post('/admin/manager/doEdit',controller.admin.manager.doEdit)

  

  router.get('/admin/role',controller.admin.role.index)
  router.get('/admin/role/add',controller.admin.role.add)
  router.get('/admin/role/edit',controller.admin.role.edit)
  router.post('/admin/role/doAdd',controller.admin.role.doAdd)
  router.post('/admin/role/doEdit',controller.admin.role.doEdit)
  router.get('/admin/role/auth', controller.admin.role.auth);
  router.post('/admin/role/doAuth',controller.admin.role.doAuth)

  router.get('/admin/access',controller.admin.access.index)
  router.get('/admin/access/add',controller.admin.access.add)
  router.get('/admin/access/edit',controller.admin.access.edit)
  router.post('/admin/access/doAdd',controller.admin.access.doAdd)
  router.post('/admin/access/doEdit',controller.admin.access.doEdit)

  
  // router.get('/user/:id', controller.home.user);
  // router.get('/spider', controller.spider.index);
  // router.get('/newscontent', controller.spider.newscontent);
  // router.get('/post',controller.post.index)
  // router.post('/add',controller.post.add)

    //上传图片演示

    router.get('/admin/focus', controller.admin.focus.index);

    router.get('/admin/focus/multi', controller.admin.focus.multi);
  
    router.post('/admin/focus/doSingleUpload', controller.admin.focus.doSingleUpload);  
  
    router.post('/admin/focus/doMultiUpload', controller.admin.focus.doMultiUpload); 
};
