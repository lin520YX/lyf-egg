'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  //验证码
  router.get('/admin/verify', controller.admin.base.verify);
  
  router.get('/admin/login', controller.admin.login.index);
  router.get('/admin/manager',controller.admin.manager.index)
  router.get('/admin/manager/add',controller.admin.manager.add)
  router.get('/admin/manager/edit',controller.admin.manager.edit)

  router.get('/admin/role',controller.admin.role.index)
  router.get('/admin/role/add',controller.admin.role.add)
  router.get('/admin/role/edit',controller.admin.role.edit)
  router.get('/admin/role/del',controller.admin.role.del)


  router.get('/admin/access',controller.admin.access.index)
  router.get('/admin/access/add',controller.admin.access.add)
  router.get('/admin/access/edit',controller.admin.access.edit)
  // router.get('/user/:id', controller.home.user);
  // router.get('/spider', controller.spider.index);
  // router.get('/newscontent', controller.spider.newscontent);
  // router.get('/post',controller.post.index)
  // router.post('/add',controller.post.add)
};
