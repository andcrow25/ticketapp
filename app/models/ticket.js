var mongoose = require('mongoose');
// var ShortId = require('mongoose-shortid-nodeps');
var increment = require('mongoose-increment');


module.exports = function() {



  var schema = mongoose.Schema({
    criador : {type: String},
    responsavel : {type: String},
    dtInicio: {type: Date, default: Date.now},
    atividade: {type: String},
    dtPrev: {type: Date},
    prioridade : {type: String},
    evento : [{
      por: {type: String},
      fila : {type : String},
      status: {type: String},
      descricao: {type: String},
      data: {type: Date, default: Date.now},
      anexo : {type : Array }
    }]

  });

  schema.plugin(increment, {
    modelName: 'Ticket', 
    fieldName: '_id',
    // type: 'ShortId',
    start: 1,
    increment: 1,
  });

  return mongoose.model('Ticket', schema);
  
};
