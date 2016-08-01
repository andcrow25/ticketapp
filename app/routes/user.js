module.exports = function (app) {
  var controller = app.controllers.user;

  app.route('/v1/users')
    .get(controller.listaUsuarios)
    .post(controller.salvaUsuario);

  app.route('/v1/users/:id')
    .get(controller.obtemUsuario)
    .post(controller.salvaUsuario)
    .delete(controller.removeUsuario);

  app.route('/v1/logged/:login')
    .get(controller.obtemLogado);
};