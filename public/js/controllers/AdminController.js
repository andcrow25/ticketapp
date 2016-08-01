angular.module('ticketapp')
    .controller('AdminController', function ($routeParams, $resource, $scope, $document, $http, $log, $location, $rootScope, $window) {


         $http.get('/v1/admin')
                        .success(function (data, status, headers, config) {
                           console.log(data);
                          
                        }).
                        error(function(){
                            console.log('erro');
                        });

                   });
    //     $http.get('/v1/admin')
    //         .then(function (data, status, headers, configres) {
    //             console.log(data);
    //             if (data == true) {
    //                 console.log('é root');
                   
    //             }else {
    //                 console.log('sem acesso root');
    //                 //  $location.path('/');
    //             }
    //             // $location.path('/admin');


    //         }, function (error) {

    //             console.log('sem acesso');
    //             //    $location.path('/');
    //         })

    // });
//  var checaRoot = function(req, res) {

//          var admin = req.headers['x-root']; // busca o token no header da requisição
//          if (admin) {
//              console.log('administrador');
//              $window.location('./admin');
//          }else
//          {
//              console.log('sem acesso');
//                $location.path('/');
//          }
//  }
    //          console.log('Token recebido, decodificando');
    //          jwt.verify(token, app.get('secret'), function(err, decoded) {
    //              if (err) {
    //                  console.log('Token rejeitado');
    //                  return res.sendStatus(401);
    //              } else {
    //                  console.log('Token aceito')
    //                  // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
    //                  req.usuario = decoded; 
    //                  console.log(req.usuario);
    //                  res.setHeader('x-root', decoded.root);

    //                 //  console.log(req.headers);  
    //                  next();
    //               }
    //         });
    //     } else {
    //         console.log('Nenhum token enviado');
    //         return res.sendStatus(401);
    //       }
    // };

