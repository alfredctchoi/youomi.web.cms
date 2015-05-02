(function () {

  'use strict';


  function LoginCtrl(AuthenticationService, $cacheFactory, $state) {

    var vm = this,
      cacheKeys = {
        main: 'login',
        sub: {
          email: 'email',
          error: 'error'
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
      var emailCache = cache.get(cacheKeys.sub.email);

      vm.resetPasswordGuid = $state.params.resetPasswordGuid;
      vm.state = cache.get(cacheKeys.sub.error) ? vm.states.loginError : vm.states.ok;
      vm.credentials = {
        email: emailCache ? emailCache : '',
        password: ''
      };

      resetLoginErrorCache();
    }

    function authenticateFromHome(credentials) {
      if (!credentials.email || !credentials.password){
        setLoginErrorState(credentials.email);
        $state.go('home.login');
        return;
      }

      AuthenticationService.authenticate(credentials.email, credentials.password)
        .then(function(){
          $state.go('dashboard.home');
        }, function(error){
          setLoginErrorState(credentials.email);
          $state.go('home.login');
        });
    }

    function setLoginErrorState(email){
      cache.put(cacheKeys.sub.email, email);
      cache.put(cacheKeys.sub.error, true);
    }

    function resetLoginErrorCache(){
      cache.put(cacheKeys.sub.email, null);
      cache.put(cacheKeys.sub.error, null);
    }
  }

  LoginCtrl.$inject = ['AuthenticationService', '$cacheFactory', '$state'];


  angular.module('youomi').controller('LoginCtrl', LoginCtrl);
})();
