angular.module('ticketapp')
    .controller('UsersController', function($routeParams, $resource, $scope, $document, $http, $log, $location, $rootScope, $window){
        



        $scope.users = [];



        var Usuario = $resource('v1/users');
        var UsuarioId = $resource('v1/users/:id');



        Usuario.query(function(usuarios){
            $scope.users = usuarios;
            console.log(usuarios);
        }, function(error){
            console.log(error);
        });

 $scope.filtroAdmin = function(user){
      return user.nome !== 'admin';
    }

    $scope.goUser = function (id) {

      $location.path('/user/' + id);
    };


$scope.removeUsuario = function(user) {

		UsuarioId.delete({id: user._id}, function() {
            $scope.users.splice(user,1);
            //  $scope.refresh();
		}, function(erro) {
			console.log(erro);
			
		});
	};
    });