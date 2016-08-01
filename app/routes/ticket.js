module.exports = function (app) {
  var controller = app.controllers.ticket;

  app.route('/v1/tickets')
    .get(controller.listaTickets)
    .post(controller.salvaTicket);

  app.route('/v1/tickets/:id')
    .get(controller.obtemTicket)
    .post(controller.salvaTicket)
    .delete(controller.removeTicket);



};
