(function () {
  'use strict';

  angular.module('myApp.directives')
    .directive('d3Bars', ['d3', function(d3) {
      return {
        restrict: 'EA',
        scope: {
          data: "=",
          label: "@",
          onClick: "&"
        },
        link: function(scope, iElement, iAttrs) {
          var svg = d3.select(iElement[0])
              .append("svg")
              .attr("width", "100%");

          // on window resize, re-render d3 canvas
          window.onresize = function() {
            return scope.$apply();
          };
          scope.$watch(function(){
              return angular.element(window)[0].innerWidth;
            }, function(){
              return scope.render(scope.data);
            }
          );

          // watch for data changes and re-render
          scope.$watch('data', function(newVals, oldVals) {
            return scope.render(newVals);
          }, true);

          // define render function
          scope.render = function(data){
            // remove all previous items before render
            svg.selectAll("*").remove();

            // setup variables
            var width, height, max;

            var margin = 65;

            width = d3.select(iElement[0])[0][0].offsetWidth - 50;
              // 20 is for margins and can be changed
            height = (scope.data.length + 1) * margin;
              // 35 = 30(bar height) + 5(margin between bars)
            max = 100;
              // this can also be found dynamically when the data is not static
              // max = Math.max.apply(Math, _.map(data, ((val)-> val.count)))

            // set the height based on the calculations above          

            svg.attr('height', height);

            //create the rectangles for the bar chart
            var bar = svg.selectAll("rect")
              .data(data)
              .enter()
                .append("rect")
                .on("click", function(d, i){return scope.onClick({item: d});})
                .attr("height", 30) // height of each bar
                .attr("width", 0) // initial width of 0 for transition
                .attr("fill", "#5A90D2")
                .attr("x", 10) // half of the 20 side margin specified above
                .attr("y", function(d, i){
                  return (i + 1) * margin;
                }) // height + margin between bars
                .transition()
                  .duration(1000) // time of duration
                  .attr("width", function(d){
                    var actual = d.score > 90 ? 90 : d.score;
                    return actual/(max/width);
                  }); // width based on scale

            var texts = svg.selectAll("text")
              .data(data)
              .enter();

            // add country name.
            texts.append("text")
                .attr("fill", "#000")
                .attr("y", function(d, i){return (i + 1) * margin - 4;})
                .attr("x", 10)
                .text(function(d){return d["name"];});

            // add score.
            texts.append("text")
                .attr("fill", "#fff")
                .attr("y", function(d, i){return (i + 1) * margin + 21;})
                .attr("x", function(d, i){
                  var actual = d.score > 90 ? 90 : d.score;
                  return actual/(max/width) + 15})
                .text(function(d){return d["score"] + "%";})
                .transition()
                  .duration(2000)
                  .attr("fill", "#000");

            // add country mentions.
            texts.append("text")
                .attr("fill", "#A2A2A2")
                .attr("y", function(d, i){return (i + 1) * margin - 3;})
                .attr("x", width - 100)
                .text(function(d){return d["mentions"] + " mentions";})
          };
        }
      };
    }]);

}());
