(function () {

  'use strict';


  function LoginCtrl(AuthenticationService, $cacheFactory, $state) {

    var vm = this,
      cacheKeys = {
        main: 'login',
        sub: {
          account: 'account'
        }
      },
      cache = $cacheFactory.get(cacheKeys.main) || $cacheFactory(cacheKeys.main);

    vm.states = {
      ok: 0,
      registerError: 1,
      loginError: 2,
      loading: 3,
      forgotPasswordError:4,
      forgotPasswordSuccess: 5,
      invalidEmail: 6,
      resetPasswordSuccess: 7,
      resetPasswordError:8,
      validResetToken: 9,
      invalidResetToken: 10
    };


    // methods
    vm.authenticateFromHome = authenticateFromHome;


    init();

    function init() {

      var loginCache = cache.get(cacheKeys.sub.account);
      if (loginCache) {
        vm.credentials = loginCache;
        cache.put(cacheKeys.sub.account, null);
        return;
      }

      vm.credentials = {
        email: '',
        password: ''
      };

      vm.resetPasswordGuid = $state.params.resetPasswordGuid;
    }

    function authenticateFromHome(credentials) {

      if (!credentials.email || !credentials.password){
        cache.put(cacheKeys.sub.account, credentials);
        $state.go('home.login');
        return;
      }

      AuthenticationService.authenticate(credentials.email, credentials.password)
        .then(function(){
          $state.go('dashboard.home');
        }, function(error){
          cache.put(cacheKeys.sub.account, credentials);
          $state.go('home.login');
        });
    }
  }

  LoginCtrl.$inject = ['AuthenticationService', '$cacheFactory', '$state'];


  angular.module('youomi').controller('LoginCtrl', LoginCtrl);
})();
