var mongoose = require('mongoose');

var increment = require('mongoose-increment');

module.exports = function(){

var schema = mongoose.Schema(
{
  login: { type: String, required: true, unique: true},
  nome:  { type: String, required: true, unique: true}, 
  senha: { type: String, required: true},
  root: {type: String, required : true}

});

schema.plugin(increment, {
    modelName: 'User', 
    fieldName: '_id',
    // type: 'ShortId',
    start: 1,
    increment: 1,
  });

return mongoose.model('User',schema);
};