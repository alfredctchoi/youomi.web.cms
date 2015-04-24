/**
 * Created by Alfred on 2015-04-24.
 */

(function () {
  'use strict';

  function yomFocusOn($timeout) {
    return {
      restrict: 'A',
      scope: {
        trigger: '=yomFocusOn'
      },
      link: function (scope, element) {
        scope.$watch('trigger', function (value) {
          if (!value) {
            return;
          }

          $timeout(function () {
            element[0].focus();
          });
        })
      }
    };
  }

  yomFocusOn.$inject = ['$timeout'];

  angular.module('youomi.core').directive('yomFocusOn', yomFocusOn);

})();
