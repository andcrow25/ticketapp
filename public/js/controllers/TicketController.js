angular.module('ticketapp')

  .controller('TicketController', function ($scope, $routeParams, $resource, $filter, $location, $route, AnexoInsert, $rootScope, $compile, $window) {

    var Ticket = $resource('v1/tickets/:id');
    var Logado = $resource('v1/logged/:login');

    if ($routeParams.ticketId) {
      Ticket.get({ id: $routeParams.ticketId },
        function (ticket) {
          $scope.ticket = ticket;
          console.log(ticket);
        },
        function (erro) {
          $scope.mensagem = {
            texto: 'Não foi possivel abrir o ticket'
          };
          console.log(erro);
        }
      );
    }
    else {
      $scope.ticket = {};
    }

    $scope.sair = function () {
      $scope.logged = {};
            delete $window.localStorage.login;
            delete $window.localStorage.token;
            
            $location.path('/');
           
            console.log('Token Retirado');
        };
    
    // $scope.logged = {};

   
    $scope.logado = function() {
    
      // var usuario = $scope.login;
      Logado.get({ login : $window.localStorage.login},
      function (userIn){
        
        $scope.logged = userIn;
        $rootScope.logged = userIn;
        console.log(userIn);
      },function (erro) {
          
          console.log(erro);
        });
    };

   

$scope.goUser = function (id) {

      $location.path('/user/' + id);
    };

    $scope.salva = function () {
      var lista = [];
      lista = AnexoInsert.getAnexos();
      var criacao =  $filter("date")(this.ticket.criacao, 'dd-MM-yy');
      var logon = $scope.logged.nome;
      console.log('Nome do owner : ' +  logon);
      var previsao =  $filter("date")(this.ticket.previsao, 'dd-MM-yy');
       $scope.ticket.criador = logon;
       $scope.ticket.evento.por = logon;
       $scope.ticket.evento.anexo = lista;
      var novoTicket =
        {
          'criador': this.ticket.criador,
          'responsavel' : this.ticket.responsavel,
          'dtInicio': criacao,
          'atividade': this.ticket.atividade,
          'dtPrev' : previsao,
          'prioridade' : this.ticket.prioridade,
          'evento' : [{
            'por' : this.ticket.evento.por,
            'fila' : this.ticket.responsavel,
            'status' : this.ticket.evento.status,
            'descricao' : this.ticket.evento.descricao,
            'anexo' : this.ticket.evento.anexo
          }]
          
        };
      
      $scope.ticket.$save(novoTicket)
        .then(function () {
          alert("Ticket cadastrado com sucesso");
          AnexoInsert.limpaLista();
          //  $scope.mensagem = { type: 'success', msg: 'Ticket cadastrado com sucesso!'};
        $route.reload();
         
          
        
          // $location.path('/#/tickets/' + $scope.ticket._id);
        })
        .catch(function (erro) {
          $scope.mensagem = { type: 'danger', msg : 'Erro ao cadastrar novo ticket' };
        });

    };

    $scope.ticket = new Ticket();


    $scope.addEvento = function () {
      var lista = [];
      lista = AnexoInsert.getAnexos();
      var logon = $scope.logged.nome;
       console.log('Nome do owner : ' +  logon);

      var evento =
        {
          'descricao': this.evento.descricao,
          'status': this.evento.status,
           'fila' : this.evento.fila,
          'por': logon ,
          'anexo': lista
        }


      //  var anexo = {'anexo' : [{'arquivo' : lista}]};

      $scope.ticket.evento.push(evento);
      // console.log( $scope.ticket.evento);
      $scope.ticket.$save();
      AnexoInsert.limpaLista();
      this.evento = {};
       
      $route.reload();
      // $route.reload();
    };
    

    

  

  

    //Desativa botão Enviar se o status estiver finalizado
    $scope.finalizado = function () {
      var status = $('#estado').text();
      if (status == 'Finalizado') {
        return true;
      }
    };

    //Formato de Data do PickDate
    $scope.myDate = new Date();
    $scope.ModifiedDate = $filter("date")(Date.now(), 'dd-MM-yy');


    $scope.listaAnexos = function(){
      console.log(AnexoInsert.getAnexos());
      
    }
  
  });
