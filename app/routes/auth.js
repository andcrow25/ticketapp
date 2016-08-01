module.exports = function(app){

  var api = app.controllers.auth;

  app.post('/autenticar',api.autentica);
   
  app.use('/v1/*',api.verificaToken);
  app.use('/v1/admin', api.checkRoot);
 
};
