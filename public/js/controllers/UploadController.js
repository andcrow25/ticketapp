angular.module('ticketapp')

    .controller('UploadController', function ($scope, Upload, $timeout, AnexoInsert, $rootScope) {



        $scope.uploadFiles = function (files, errFiles) {
            console.log('iniciando upload');
            $scope.files = files;
            $scope.errFiles = errFiles;
            var lista = [];
            $rootScope.lista = lista;

            angular.forEach(files, function (file) {
                console.log(files);
                file.upload = Upload.upload({
                    url: '/upload',
                    data: { file: file }
                });

                file.upload.then(function (response) {
                    $timeout(function () {
                        console.log('upload realizado');
                        file.result = response.data;
                        file.link = response.data.nome;
                        AnexoInsert.adicionaAnexo(file.link);
                        console.log(AnexoInsert.getAnexos());
                        // lista.push(file.link);
                    });
                }, function (response) {
                    if (response.status > 0)
                        $scope.errorMsg = response.status + ': ' + response.status + ': ' + response.data;
                        $route.reload();
                        
                }, function (evt) {
                    file.progress = Math.min(100, parseInt(100.0 *
                        evt.loaded / evt.total));
                });
            });
        }

        $scope.anexosList = AnexoInsert.getAnexos();

        $scope.apagaLista = function(){
            AnexoInsert.limpaLista();
            $scope.anexosList = AnexoInsert.getAnexos();
        }
    });