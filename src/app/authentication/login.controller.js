(function () {

  'use strict';


  function LoginCtrl(AuthenticationService, UserService, $state) {

    var vm = this;

    // methods
    vm.authenticate = authenticate;
    vm.register = register;

    // properties
    vm.states = {
      ok: 0,
      registerError: 1,
      loginError: 2,
      loading: 3
    };

    init();

    function init() {
      vm.view = 'login';
      vm.credentials = {
        email: '',
        password: ''
      };

      vm.account = {
        email:'',
        password: '',
        name:''
      };

      vm.state = vm.states.ok;
    }

    function authenticate(credentials) {
      AuthenticationService.authenticate(credentials.email, credentials.password)
        .then(function(session){
          $state.go('dashboard.home');
        }, function(error){
          vm.state = vm.states.loginError;
          vm.error = error.code;
        });
    }

    function register(account) {
      //todo: validation
      var registerPromise = UserService.register(account.name, account.email, account.password);
      registerPromise.then(function(){
        $state.go('home.user.registration-complete');
      }, function(error){
        vm.state = vm.states.registerError;
        vm.error = error.message;
      });
    }

  }

  LoginCtrl.$inject = ['AuthenticationService', 'UserService', '$state'];


  angular.module('youomi').controller('LoginCtrl', LoginCtrl);
})();
