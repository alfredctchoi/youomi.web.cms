/**
 * Created by Alfred on 2015-04-25.
 */

(function () {
  'use strict';

  function yomHinter($compile) {

    var html = '<div class="dashboard-email-search-hint">' +
      '<ul class="list-unstyled">' +
      '<li ng-repeat="match in matches" ng-click="selectItem(match.key)" ng-class="{active: selectedIndex === $index}">' +
      '{{match.value}}' +
      '</li>' +
      '</ul>' +
      '</div>';


    return {
      restrict: 'A',
      scope: {
        matches: '=yomHinterMatches',
        callback: '&yomHinterCallback'
      },
      link: function (scope, element, attrs) {

        var searchElement;

        scope.selectedIndex = 0;
        scope.selectItem = selectItem;

        function keyListenerEvent(e) {
          switch (e.keyCode) {
            case 38: //up
              e.preventDefault();
              if (scope.selectedIndex > 0) {
                scope.$apply(function () {
                  scope.selectedIndex--;
                });
              }
              break;
            case 40: //down
              e.preventDefault();
              if (scope.selectedIndex < scope.matches.length - 1) {
                scope.$apply(function () {
                  scope.selectedIndex++;
                });
              }
              break;
            case 13: //enter
              e.preventDefault();
              scope.$apply(function(){
                scope.selectItem(scope.matches[scope.selectedIndex].key);
              });
              break;
          }
        }

        function removeSearch(){
          detachListeners();
          searchElement.remove();
          searchElement = null;
        }

        function attachListeners() {
          element.on('keydown', keyListenerEvent);
        }

        function detachListeners() {
          element.off('keydown', keyListenerEvent);
        }

        function selectItem(key) {
          scope.callback({key: key});
          removeSearch();
        }

        function createElement() {
          searchElement = $compile(html)(scope);
          element.after(searchElement);
          attachListeners();
        }

        function matchWatcher(matches) {
          if (!matches || matches.length === 0) {
            if (searchElement){
              removeSearch();
            }
            return;
          }

          if (matches.length > 0 && !searchElement) {
            createElement();
          }
        }

        scope.$watch('matches', matchWatcher, true);
      }
    }
  }

  yomHinter.$inject = ['$compile'];

  angular.module('youomi.dashboard').directive('yomHinter', yomHinter);

})();
