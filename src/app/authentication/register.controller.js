(function () {

  'use strict';


  function RegisterCtrl($cacheFactory, UserService, $state) {

    var vm = this,
      cacheKey = 'register',
      cache = $cacheFactory.get(cacheKey) || $cacheFactory(cacheKey);

    // methods
    vm.registerFromHome = registerFromHome;
    vm.register = register;

    init();

    function init() {
      var cacheAccount = cache.get('account');
      if (cacheAccount) {
        vm.account = cacheAccount;
        cache.put('account', null);
        return;
      }

      vm.account = {
        email: '',
        password: '',
        name: '',
        isValid: function () {
          return this.email && this.password && this.name;
        }
      };
    }

    function register(account) {
      if (!account.isValid()) return;
      createUser(account.name, account.email, account.password);

    }

    function registerFromHome(account) {

      if (!account.isValid()) {
        cache.put('account', account);
        $state.go('home.sign-up');
        return;
      }

      createUser(account.name, account.email, account.password);
    }

    function createUser(name, email, password){
      var registerPromise = UserService.register(name, email, password);
      registerPromise.then(function () {
        $state.go('home.account.register-complete');
      }, function (error) {

      });
    }

  }

  RegisterCtrl.$inject = ['$cacheFactory', 'UserService', '$state'];


  angular.module('youomi.authentication').controller('RegisterCtrl', RegisterCtrl);
})();
