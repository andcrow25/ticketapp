angular.module('ticketapp')
    .factory('AnexoInsert', function(){

        var listaDeAnexos = [];

        var adicionaAnexo = function(anexo){
            listaDeAnexos.push(anexo);
        };

        var limpaLista = function(){
            return listaDeAnexos = [];
        };

        var getAnexos = function(){
            return listaDeAnexos;
            
        };

        return {
            adicionaAnexo : adicionaAnexo,
            getAnexos : getAnexos,
            limpaLista : limpaLista
        };
    });