angular.module('ticketapp')

  .controller('UserController', function ($scope, $routeParams, $resource, $filter, $location, $route, AnexoInsert, $rootScope, $compile, $window) {


    $scope.mensagem = { texto: '' };

   

    var Usuario = $resource('v1/users/:id');




 if ($routeParams.userId) {
      Usuario.get({ id: $routeParams.userId },
        function (user) {
          $scope.user = user;
          console.log(user.login);
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
      $scope.user = {};
    };



   

    $scope.goUsuario = function (id) {

      $location.path('/user/' + id);
    };



   $scope.salvaUsuario = function() {
     
     $scope.user.$save()
     .then(function(){
        
       
       console.log('salvo');
        $scope.mensagem = {texto : 'Salvo'};
        $route.reload();
     })
     .catch(function(erro){
       console.log(erro);
     });
   };

$scope.user = new Usuario();




  });
