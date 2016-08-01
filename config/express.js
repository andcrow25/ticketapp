var express = require('express');
var app = express();
var load = require('express-load');
var bodyParser = require('body-parser');
var consign = require('consign');
var multer = require('multer');


module.exports = function(){
  

  app
  .use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost/*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();})
    .set('secret','12345')
    .set('port',80)
    .use(express.static('./public'))
    .set('view engine','ejs')
    .set('views','./app/views')
    
    .use(bodyParser.urlencoded({extended : true}))
    .use(bodyParser.json())
    
    .use(require('method-override')());


consign({cwd: 'app'})
  .include('models')
  .then('controllers')
  .then('routes/auth.js')
  .then('routes/user.js')
  .then('routes')
  .into(app);
 

 

    return app;
};
