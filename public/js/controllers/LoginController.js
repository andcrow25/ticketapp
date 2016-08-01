angular.module('ticketapp')
    .controller('LoginController', function ($scope, $http, $location, $rootScope, $window) {
        $scope.usuario = {};
        $scope.mensagem = '';


        $scope.autenticar = function () {
            var usuario = $scope.usuario;


            $http.post('/autenticar',
                { login: usuario.login, senha: usuario.senha })
                .then(function () {
                   $window.localStorage.login = $scope.usuario.login;
                    $location.path('/');
                    
                    var login = usuario;
                }, function (error) {

                    $scope.usuario = {};
                    $scope.mensagem = 'Login ou senha invalida';
                })
        };


        // $scope.getLogin = function (login) {
            
        //     return console.log(login);
        // }

        
    });
