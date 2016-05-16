(function () {
  'use strict';

  angular.module('myApp.controllers')
    .controller('DemoCtrl', ['$scope', function($scope){
      $scope.title = "DemoCtrl";
      $scope.d3Data = [
        {name: "United Stated", score:38.6, mentions: 22},
        {name: "Australia", score:7, mentions: 4},
        {name: "Brazil", score: 7, mentions: 4},
        {name: "Venezuela", score: 5.3, mentions: 3},
        {name: "United Kindom", score: 5.3, mentions: 3}
      ];
      $scope.d3OnClick = function(item){
        alert(item.name);
      };
    }])
    .filter('num', function() {
      return function(input) {
        return parseInt(input, 10);
      };
    });

}());
