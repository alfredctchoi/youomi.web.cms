/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function preloadForDashboard(DashboardService){
    return DashboardService.setOwers();
  }

  preloadForDashboard.$inject = ['DashboardService'];

  function configs($stateProvider) {
    $stateProvider
      .state('dashboard',{
        url:'/dashboard',
        abstract: true,
        resolve: {
          preload: preloadForDashboard
        },
        templateUrl: 'app/dashboard/views/main.html'
      })
      .state('dashboard.home', {
        url:'/home',
        templateUrl: 'app/dashboard/views/home.html'
      })
  }

  configs.$inject = ['$stateProvider'];

  angular.module('youomi.dashboard', ['ui.router'])
    .config(configs);

})();
