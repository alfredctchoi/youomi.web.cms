/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function configs($stateProvider){
    $stateProvider
      .state('home.user', {
        url:'user',
        abstract:true,
        template: '<ui-view></ui-view>'
      });
  }

  configs.$inject = ['$stateProvider'];

  angular
    .module('youomi.user', ['ui.router'])
    .config(configs);

})();
