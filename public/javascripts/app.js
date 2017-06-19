var app = angular.module('app', []);

app.controller('MyCtrl', function ($scope, $http) {

    $scope.resultados = [];
    $scope.keywords='';
    $scope.propertyName = 'points';
    $scope.reverse = true;

    $scope.cargarResultados = function () {
        $http({
            method: 'POST',
            url: '/listar2',
            params: {
                text : $scope.keywords
            }
        }).success(function (data) {
            if (typeof(data) == 'object') {
                $scope.resultados = data;
            } else {
                alert('Error al intentar recuperar los clientes.');
            }
        }).error(function () {
            alert('Error al intentar recuperar los clientes.');
        });
    };

    $scope.sorterFunc = function (resultados) {

        if($scope.keywords.length<6){
            return parseInt(resultados.points);
        }else{
            return parseInt(resultados.comments);
        }
    };

    $scope.changeKeywords = function() {

        console.log("El input ha cambiado");

        $http({
            method: 'POST',
            url: '/listar2',
            params: {
                text : $scope.keywords
            }
        }).success(function (data) {
            if (typeof(data) == 'object') {
                $scope.resultados = data;
            } else {
                alert('Error al intentar recuperar los clientes.');
            }
        }).error(function () {
            alert('Error al intentar recuperar los clientes.');
        });
    }

});
