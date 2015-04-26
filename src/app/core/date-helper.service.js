/**
 * Created by Alfred on 2015-04-25.
 */

(function () {
    'use strict';

  function DateHelperProvider(){

    var regexIso8601 = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d+([+-][0-2]\d:[0-5]\d|Z)/;

    function convertDateStringsToDates(input) {
      // Ignore things that aren't objects.
      if (typeof input !== "object") return input;

      for (var key in input) {
        if (!input.hasOwnProperty(key)) continue;

        var value = input[key];
        var match;
        // Check for string properties which look like dates.
        if (typeof value === "string" && (match = value.match(regexIso8601))) {
          var milliseconds = Date.parse(match[0]);
          if (!isNaN(milliseconds)) {
            input[key] = new Date(milliseconds);
          }
        } else if (typeof value === "object") {
          // Recurse into object
          convertDateStringsToDates(value);
        }
      }
    }

    function DateHelper(){
      this.convertDateStringsToDates = convertDateStringsToDates;
    }

    return {
      convertDateStringsToDates: convertDateStringsToDates,
      $get: function(){
        return new DateHelper();
      }
    };
  }

  angular.module('youomi.core').provider('DateHelper', DateHelperProvider);

})();
