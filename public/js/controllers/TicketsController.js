angular.module('ticketapp')
  .controller('TicketsController', function ( $resource, $scope, $document, $http, $log, $location, $rootScope, $filter, filterFilter) {


    $scope.mensagem = { texto: '' };

    $scope.tickets = [];


    var Ticket = $resource('v1/tickets');

    Ticket.query(function (tickets) {
      $scope.tickets = tickets;
      // $scope.filtered = $filter($scope.isClosed, $scope.tickets);
      $scope.totalItems = $scope.tickets.length;
      
    }, function (error) {
      console.log(error);
    });

    $scope.goTicket = function (id) {

      $location.path('/ticket/' + id);
    };

    $scope.prioBg = function (prio) {
      if (prio == 'Alta') {
        return 'bg-danger';
      }
      if (prio == 'Media') {
        return 'bg-warning';
      }
    }

   $scope.sort = function(chave){
        $scope.sortKey = chave;  
        $scope.reverse = !$scope.reverse; 
    }

    $scope.porPag = {num : 15};
   
    $scope.status = angular.element($('#status')).val();

$scope.status = {
    isCustomHeaderOpen: false,
    isFirstOpen: false,
    isFirstDisabled: false
  };

// $scope.checkMy = $rootScope.logged;

$scope.isClosed = '!Finalizado';
// $scope.miTy = {sin : '', cri : ''};
// Filtro da página inicial e paginação
    // $scope.isClosed = {check : '!Finalizado'};
    // $scope.$watch('isClosed.check');
    $scope.$watch('porPag.num');
  
   $scope.checar = function(nome) {
     $scope.myTickets = nome;
     console.log(nome);
   };
  
     
    $scope.viewby = 10;
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

   
    // $scope.$watch('isClosed', function(check){
    //   $scope.filtered = filterFilter($scope.tickets, check);
      // $scope.numPages = Math.ceil($scope.filtered.length/$scope.maxSize);
    // });


    
    $scope.pageChanged = function () {
      console.log('Page changed to: ' + $scope.currentPage);
    };

    $scope.setItemsPerPage = function (num) {
      $scope.itemsPerPage = num;
      $scope.currentPage = 1; //reinicia para a primeira página
    };

$scope.linhas = function() {
  console.log($scope.filtered.length);
};



  });
