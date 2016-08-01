module.exports = function (app) {

    var mongoose = require('mongoose');
    var jwt = require('jsonwebtoken');

    var api = {};

    var Login = mongoose.model('User');


    api.autentica = function (req, res) {

        Login.findOne({
            login: req.body.login,
            senha: req.body.senha
        })
            .then(function (usuario) {
                if (!usuario) {
                    console.log('Login/senha inválidos');
                    res.sendStatus(401);
                } else {
                    var token = jwt.sign({ login: usuario.login, root: usuario.root }, app.get('secret'), {
                        expiresIn: 86400 // valor em segundo, aqui temos um total de 24 horas

                    });
                    console.log('Autenticado: token adicionado na resposta');
                    res.set('x-access-token', token);
                    res.end(); // enviando a resposta


                }
            });

    };

    api.verificaToken = function (req, res, next) {

        var token = req.headers['x-access-token']; // busca o token no header da requisição
        if (token) {
            console.log('Token recebido, decodificando');
            jwt.verify(token, app.get('secret'), function (err, decoded) {
                if (err) {
                    console.log('Token rejeitado');
                    return res.sendStatus(401);
                } else {
                    console.log('Token aceito')
                    // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
                    req.usuario = decoded;
                    console.log(req.usuario);
                    res.setHeader('x-root', decoded.root);

                    //  console.log(req.headers);  
                    next();
                }
            });
        } else {
            console.log('Nenhum token enviado');
            return res.sendStatus(401);
        }
    };

    api.checkRoot = function (req, res) {
         var admin = req.headers['x-access-token'];
        jwt.verify(admin, app.get('secret'), function (err, decoded) {
           
           if (err) {
                    console.log('Token rejeitado');
                    return res.sendStatus(401);
                }   else {
                    console.log('validando root')
                    // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
                    
                    res.json(decoded.root);
                
                    //  console.log(req.headers);  
                  
                }

        })
    }

  return api;




    };
    // api.checkRoot = function(req, res) {
    //     var admin = req.usuario.root;
    //    console.log('checando admin');
    //         if (admin.root == false){
    //               res.sendStatus(403);

    //         } else{
    //           res.json(admin);
    //         }
    //     };
        // console.log('checando admin');
        // var admin = req.headers['x-access-token'];
        //                jwt.verify(admin, app.get('secret'), function(err, decoded) {
        //                    console.log(decoded);
        //          if (err) {
        //              console.log('Token rejeitado');
        //              return res.sendStatus(401);
        //          } else {
        //              console.log('Token aceito')
        //              // guardou o valor decodificado do token na requisição. No caso, o login do usuário.
        //              req.usuario = decoded;  
        //             //  console.log(req.headers);  

        //           }
        //     });

        //     console.log('Nenhum token enviado');
        //     return res.sendStatus(401);


            // console.log(admin);
            // jwt.verify(admin, app.get('secret'), function(err, decoded) {
            // // var isRoot = jwt.decode(admin);
            // console.log('acesso é: ' + isRoot.root);
            // if (isRoot.root == true){
            //    req.admin = isRoot;
            //    next();
            // }else {
            //     console.log('sem acesso');
            //     return res.sendStatus(401);
            // };
         ///////////////////////////////////////////////////////////
            // if (admin){
            //  jwt.verify(admin, app.get('secret'), function(err, decoded) {

            //     if (err) {
            //          console.log('Token decodificado e reiejtado');
            //          return res.sendStatus(401);
            //     } else{
            //         var checagem = function(admin){
            //             if (admin = true){
            //                 console.log('admin aceito');
            //                  res.json(decoded);

            //             }
            //             if (admin = false){
            //                 return res.sendStatus(401);
            //             }
            //         }
            //         checagem(admin.root);

            //           }
            // });
            // }
            // };
                //     isRoot = decoded.root;
                // console.log('usuario root : '+ isRoot);
                //  if (isRoot = false) {
                //       console.log('Sem acesso para a rota');
                //      return res.sendStatus(401);

                //  } else {
                //        console.log('Permissão aceita');

                //      res.json(decoded); 

                // }







