/**
 * Created by Alfred on 2015-04-17.
 */

(function () {
    'use strict';

  function UserCtrl (UserService, $state, $timeout){

    var vm = this;
    vm.activate = activate;
    vm.states = {
      loading: 0,
      ok: 1,
      error: 2
    };

    init();

    function init() {
      vm.guid = $state.params.id;
      vm.state = vm.states.loading;
    }

    function activate (guid) {

      if (!guid){
        return;
      }

      UserService.activate(guid).then(function(data){
        vm.state = vm.states.ok;
        $timeout(function(){
          $state.go('home.homepage');
        }, 3000);
      }, function(err){
        vm.state = vm.states.error;
      });
    }

  }

  UserCtrl.$inject = ['UserService', '$state', '$timeout'];

  angular.module('youomi.user').controller('UserCtrl', UserCtrl);

})();
