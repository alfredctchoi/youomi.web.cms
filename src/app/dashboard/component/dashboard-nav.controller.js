/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
  'use strict';

  function DashboardNavCtrl(AuthenticationService, SessionService,  $state) {
    var vm = this;
    vm.logout = logout;

    init();

    function init(){
      var session = SessionService.getSession();
      vm.authenticatedUser = session.user;
    }

    function logout() {
      AuthenticationService
        .logout()
        .then(function () {
          $state.go('home.homepage');
        }, function () {

        });
    }
  }

  DashboardNavCtrl.$inject = ['AuthenticationService', 'SessionService', '$state'];

  angular.module('youomi.dashboard').controller('DashboardNavCtrl', DashboardNavCtrl);

})();
