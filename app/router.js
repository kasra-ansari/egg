'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // router.resources('user', '/login', app.controller.user);
  router.post('/login', app.controller.user.create);
  router.get('/current', app.jwt);
};
