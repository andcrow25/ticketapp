var http = require ('http');

var app = require('./config/express')();

require('./config/database.js')('mongodb://localhost/dataticket');
// app.use(function(req, res, next) { //allow cross origin requests
//         res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//         res.header("Access-Control-Allow-Origin", "http://localhost");
//         res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//         next();});
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express Server escutando na porta ' +
  app.get('port'));
});
