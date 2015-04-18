/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
  'use strict';

  function MainDashboardCtrl(SessionService) {

    var vm = this;

    init();

    function init() {
      var session = SessionService.getSession();
      vm.authenticatedUser = session.user;
    }

  }

  MainDashboardCtrl.$inject = ['SessionService'];

  angular.module('youomi.dashboard').controller('MainDashboardCtrl', MainDashboardCtrl);

})();
