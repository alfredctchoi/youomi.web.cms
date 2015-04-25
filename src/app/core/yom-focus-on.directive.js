/**
 * Created by Alfred on 2015-04-24.
 */

(function () {
  'use strict';

  function yomFocusOn($timeout) {
    return {
      restrict: 'A',
      scope: {
        trigger: '=yomFocusOn',
        callback: '&yomFocusOnCallback'
      },
      link: function (scope, element) {

        function unbindAll(){
          element.off();
        }

        function onBlur(){
          scope.$apply(function () {
            scope.callback();
            unbindAll();
          });
        }

        function onKeyDown(e){
          if(e.keyCode === 13){
            scope.callback();
            unbindAll();
          }
        }

        scope.$watch('trigger', function (value) {
          if (!value) {
            return;
          }

          $timeout(function () {
            element[0].focus();
          });

          element.on('blur', onBlur);
          element.on('keydown', onKeyDown)
        })
      }
    };
  }

  yomFocusOn.$inject = ['$timeout'];

  angular.module('youomi.core').directive('yomFocusOn', yomFocusOn);

})();
