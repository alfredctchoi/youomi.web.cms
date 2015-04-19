(function () {
  'use strict';

  function momentFilter(){
    return function(value, format){
      if (!value){
        return;
      }

      format = format || 'YYYY-MM-DD';
      var date = moment(value);

      if (!date.isValid()){
        return;
      }

      return date.format(format);
    }
  }

  angular.module('youomi.core').filter('Moment', momentFilter);

})();
