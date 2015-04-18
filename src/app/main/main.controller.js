(function () {

  'use strict';

  function MainCtrl(SessionService) {

    var vm = this;
    vm.isAuthenticated = SessionService.hasSession();

  }

  MainCtrl.$inject = ['SessionService'];

  angular.module('youomi').controller('MainCtrl', MainCtrl);
})();
