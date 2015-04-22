/**
 * Created by Alfred on 2015-04-22.
 */

(function () {
  'use strict';

  function AccountCtrl(UserService, AuthenticationService, $state, $timeout) {
    var vm = this;
    vm.activate = activate;
    vm.resetPassword = resetPassword;
    vm.validateResetToken = validateResetToken;
    vm.forgotPassword = forgotPassword;
    vm.states = {
      none: 0,
      loading: 1,
      ok: 2,
      error: 3,
      resetPasswordSuccess: 4
    };

    init();

    function init() {
      vm.guid = $state.params.id;
      vm.state = vm.states.none;
    }

    function validateResetToken(guid) {
      AuthenticationService
        .validateResetToken(guid)
        .then(function () {
          vm.state = vm.states.ok;
        }, function () {
          vm.state = vm.states.error;
        })
    }

    function resetPassword(guid, password) {
      var timeoutProm;
      AuthenticationService
        .resetPassword(guid, password)
        .then(function () {
          vm.state = vm.states.resetPasswordSuccess;
          $timeout(function(){
            $timeout.cancel(timeoutProm);
            timeoutProm = null;
            $state.go('home.homepage');
          }, 3000)
        }, function (error) {
          vm.state = vm.states.error;
          vm.error = error.code;
        })
    }

    function activate(guid) {
      if (!guid) {
        return;
      }

      UserService
        .activate(guid)
        .then(function () {
          vm.state = vm.states.ok;
        }, function (err) {
          vm.state = vm.states.error;
          vm.error = err.code;
        });
    }

    function forgotPassword(email) {
      if (!email)return;

      AuthenticationService
        .forgotPassword(email)
        .then(function () {
          vm.state = vm.states.ok;
        }, function (error) {
          vm.state = vm.states.error;
          vm.error = error.code;
        });
    }
  }

  AccountCtrl.$inject = ['UserService', 'AuthenticationService', '$state', '$timeout'];

  angular.module('youomi.authentication').controller('AccountCtrl', AccountCtrl);

})();
