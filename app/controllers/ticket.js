var mongoose = require('mongoose');

module.exports = function (app) {

  //Variável que inicia o modelo em /app/models/ticket.js
  var Ticket = mongoose.model('Ticket');

  //Variável que inicia o controller
  var controller = {};

  //Lista Tickets dentro do modelo em  /models/mongoose
  controller.listaTickets = function (req, res) {
    Ticket.find().exec()
      .then(
      function (tickets) {
        res.json(tickets);
      },
      function (erro) {
        console.log(erro);
        res.status(500).json(erro);
      }
      );
  };


  //Obtem o ticket a partir do ID
  controller.obtemTicket = function (req, res) {
    var _id = req.params.id;
    Ticket.findById(_id).exec()
      .then(function (ticket) {
        if (!ticket) throw new Error("Ticket não encontrado");
        res.json(ticket);
      
      },
      function (erro) {
        console.log(erro);
        res.status(404).json(erro);
      }
      );
  };


  controller.novoTicket = function (req, res) {

  };



  controller.salvaTicket = function (req, res) {
    var _id = req.body._id;
    if (_id) {
      Ticket.findByIdAndUpdate(_id, req.body).exec()
        .then(
        function (ticket) {
          res.json(ticket);
        },
        function (erro) {
          console.error(erro);
          res.status(500).json(erro);
        }
        );
    } else {
      Ticket.create(req.body)
        .then(
        function (ticket) {
          res.status(201).json(ticket);
        },
        function (erro) {
          console.log(erro);
          res.status(500).json(erro);
        }
        );
    }
  };

  //Função para adicionar Novo Ticket
  function adiciona(ticketNovo) {
    tickets.push(ticketNovo);
    return ticketNovo;
  };

  //Função para atualizar evento em ticket já criado
  function atualiza(ticketAlterar) {
    tickets = tickets.map(function (ticket) {
      if (ticket._id == ticketAlterar._id) {
        ticket = ticketAlterar;
      }
      return ticket;
    });
    return ticketAlterar;
  }

  //Funcção para remover ticket//
  //Desabilitada por padrão
  controller.removeTicket = function (req, res) {
    var idTicket = req.params.id;
    tickets = tickets.filter(function (ticket) {
      return ticket._id != idTicket;
    });
    res.status(204).end();
  };

  return controller;



};
