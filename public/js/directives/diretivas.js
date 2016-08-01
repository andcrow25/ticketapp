angular.module('minhaDiretiva', [])
	.directive('meuCabecalho', function() {

		var ddo = {};

		ddo.restrict = "E";
        ddo.transclude = true;
		ddo.compile = function(tElement, attr){
			attr.$observe('logged', function(ddo){
				console.log('logout', ddo);
			}, true);
		};

        ddo.templateUrl = 'js/directives/meuCabecalho.html';

		return ddo;
	})

	.directive('meuUpload', function() {

		var ddo = {};

		ddo.restrict = "E";
        ddo.transclude = true;

        ddo.templateUrl = 'js/directives/meuUpload.html';

		return ddo;
	})


	 .directive('pwCheck', [function () {
    return {
      require: 'ngModel',
      link: function (scope, elem, attrs, ctrl) {
        var pass1 = '#' + attrs.pwCheck;
        elem.add(pass1).on('keyup', function () {
          scope.$apply(function () {
            var v = elem.val()===$(pass1).val();
            ctrl.$setValidity('pwmatch', v);
          });
        });
      }
    }
  }])

  .filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
})


// .factory('acesso', function(){
//     var acc = {};
//     this.access = false;
//     obj.getPermission = function(){
//         this.access
//     }
// })
;
