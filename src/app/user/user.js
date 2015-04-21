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
      })
      .state('home.user.registration-complete', {
        url: '/registration-complete',
        templateUrl: 'app/user/views/registration-complete.html'
      })
      .state('home.user.activate', {
        url: '/activate/:id',
        templateUrl: 'app/user/views/activate.html'
      });
  }

  configs.$inject = ['$stateProvider'];

  angular
    .module('youomi.user', ['ui.router'])
    .config(configs);

})();
