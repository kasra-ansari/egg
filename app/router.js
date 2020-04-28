'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // router.resources('user', '/login', app.controller.user);
  router.post('/login', app.controller.userAccess.login);
  router.get('/current', app.jwt, app.controller.userAccess.current);

  router.resources('users', '/users', app.jwt, app.controller.user);

  router.resources('posts', '/posts', app.jwt, app.controller.post);
};
