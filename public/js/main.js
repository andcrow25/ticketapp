angular.module('ticketapp',['ngRoute', 'ngResource', 'ngMaterial', 'ngAnimate', 'ngAria','ui.bootstrap', 'minhaDiretiva', 'ngFileUpload', 'angularUtils.directives.dirPagination'])


.run(function($rootScope, $window) {
     $rootScope.isAdmin = function(){
     
    if ($window.localStorage.login == 'admin'){
     
      return true;
    } else {
      return false;
    }

};
    $rootScope.voltar = function(){
  $window.history.back();
};    

   $rootScope.prioBg = function(prio){
  if (prio =='Alta'){
    return 'bg-danger';
  }
  if (prio =='Media'){
    return 'bg-warning';
  }
} 

    })
.config(function($routeProvider,$locationProvider, $httpProvider){
  
  $httpProvider.interceptors.push('tokenInterceptor');
 $locationProvider.html5Mode(true);

 

  $routeProvider
    .when('/tickets', {
      templateUrl: '/partials/tickets.html',
      controller : 'TicketsController'
    })

    .when('/ticket/:ticketId',{
      templateUrl : '/partials/ticket.html',
      controller : 'TicketController'
      
    })

    

    .when('/novo',{
      templateUrl: '/partials/novo.html',
      controller : 'TicketController'
    })

    .when('/newuser', {
      templateUrl : '/partials/usuario.html',
      controller : 'UserController'
    })

    .when('/users', {
      templateUrl : '/partials/usuarios.html',
      controller : 'UsersController',
      
    })

    .when('/admin', {
      templateUrl : '/partials/admin.html',
      controller : 'AdminController'
      // ,
      // resolve : {
      //   validaRoot :  ["$q", "$routeParams", function($http, $q, $routeParams) {
      //     var root 
      //     console.log(root);
      //   }]  
      // }
      
    })

    .when('/user/:userId', {
      templateUrl : '/partials/usuario.html',
      controller : 'UserController'
    })

    .when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController'
		})

    // .when('/uploads/:file', {
    //   redirectTo: '/uploads/:file'
    // })

    .otherwise({
      redirectTo: '/tickets'
    });

     
})


;
