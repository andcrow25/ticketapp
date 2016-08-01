angular.module('ticketapp')
    .factory('tokenInterceptor', function ($q, $window, $location, $rootScope) {

        var interceptor = {};

        interceptor.request = function (config) {
            // enviar o token na requisição
            config.headers = config.headers || {};
            if ($window.localStorage.token) {
                console.log('Enviando token já obtido em cada requisição');
                //  $rootScope.permissao = config.headers('usuario');

                config.headers['x-access-token'] = $window.localStorage.token;

            }
            return config;
        },

            interceptor.response = function (response) {
                var token = response.headers('x-access-token');
                var root = response.headers('x-root');
                console.log(root);
                if (token) {
                    $window.localStorage.token = token;
                    console.log('token recebido no navegador');
                }
                return response;
            },

            // interceptor.response = function (response) {
            //     var token = response.headers('x-access-token');

            //    console.log($rootScope.permissao);
            //     if (token != null) {
            //         $window.localStorage.token = token;
            //         console.log('Token no session storage: ', token);
            //     } 
            //     return response;
            // },

            interceptor.responseError = function (rejection) {

                if (rejection != null && rejection.status === 401) {
                    console.log('Removendo token da sessão')
                    delete $window.localStorage.token;
                    $location.path("/login");
                }
                return $q.reject(rejection);
            }

        return interceptor;
    });
