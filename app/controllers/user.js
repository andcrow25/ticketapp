var mongoose = require('mongoose');

module.exports = function (app) {

  //Variável que inicia o modelo em /app/models/usuario.js
  var Usuario = mongoose.model('User');


  //Variável que inicia o controller
  var controller = {};

  //Lista usuarios dentro do modelo em  /models/mongoose
  controller.listaUsuarios = function (req, res) {
    Usuario.find().select('-senha').exec()
      .then(
      function (usuarios) {
        res.json(usuarios);
      
      },
      function (erro) {
        console.log(erro);
        res.status(500).json(erro);
      }
      );
  };

  controller.obtemLogado = function(req,res){
    console.log(req.params.login);
    var logado = req.params.login;
    Usuario.findOne({login : logado}).select('-senha')
    .exec()
      .then(function(logged){
        res.json(logged);
        console.log(log);
      }, function(erro){
        console.log(erro);
        res.status(404).json(erro);
      });
  };


  //Obtem o usuario a partir do ID
  controller.obtemUsuario = function (req, res) {
    var _id = req.params.id;
    Usuario.findById(_id).select('-senha').exec()
      .then(function (usuario) {
        if (!usuario) throw new Error("usuario não encontrado");
        res.json(usuario);
        console.log(usuario);
      
      },
      function (erro) {
        console.log(erro);
        res.status(404).json(erro);
      }
      );
  };


  controller.novoUsuario = function (req, res) {

  };



  controller.salvaUsuario = function (req, res) {
    var _id = req.body._id;
    if (_id) {
      Usuario.findByIdAndUpdate(_id, req.body).exec()
        .then(
        function (usuario) {
          res.json(usuario);
        },
        function (erro) {
          console.error(erro);
          res.status(500).json(erro);
        }
        );
    } else {
      Usuario.create(req.body)
        .then(
        function (usuario) {
          console.log(usuario);
          res.status(201).json(usuario);
        },
        function (erro) {
          console.log(erro);
          res.status(500).json(erro);
        }
        );
    }
  };

  //Função para adicionar Novo usuario
  function adiciona(usuarioNovo) {
    usuarios.push(usuarioNovo);
    return usuarioNovo;
  };

  //Função para atualizar evento em usuario já criado
  function atualiza(usuarioAlterar) {
    usuarios = usuarios.map(function (usuario) {
      if (usuario._id == usuarioAlterar._id) {
        usuario = usuarioAlterar;
      }
      return usuario;
    });
    return usuarioAlterar;
  }

  //Funcção para remover usuario//
  //Desabilitada por padrão
  controller.removeUsuario = function (req, res) {
    console.log('removendo usuario' + req.params.id);
    Usuario.remove({ _id : req.params.id})
    .then(function(){
      res.sendStatus(204);
    }, function(error){
      console.log(error);
      res.sendStatus(500).json(error);
    });
    // var idUsuario = req.params.id;
    // usuarios = usuarios.filter(function (usuario) {
    //   return usuario._id != idUsuario;
    // });
    // res.status(204).end();
  };

  return controller;



};
