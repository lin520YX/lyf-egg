'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.get('/user/:id', controller.home.user);
  router.get('/spider', controller.spider.index);
  router.get('/newscontent', controller.spider.newscontent);
  router.get('/post',controller.post.index)
  router.post('/add',controller.post.add)
};
