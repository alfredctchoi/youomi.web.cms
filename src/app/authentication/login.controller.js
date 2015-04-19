(function () {

  'use strict';


  function LoginCtrl(AuthenticationService, UserService, $state) {

    var vm = this;

    // methods
    vm.authenticate = authenticate;
    vm.register = register;
    vm.forgotPassword = forgotPassword;
    vm.resetPassword = resetPassword;
    vm.validateResetToken = validateResetToken;

    // properties
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
      vm.resetPasswordGuid = $state.params.resetPasswordGuid;
    }

    function validateResetToken(guid){
      AuthenticationService
        .validateResetToken(guid)
        .then(function(){
          vm.state = vm.states.validResetToken;
        }, function(){
          vm.state = vm.states.invalidResetToken
        })
    }

    function resetPassword (guid, password){
      AuthenticationService
        .resetPassword(guid, password)
        .then(function(){
          vm.state = vm.states.resetPasswordSuccess;
        }, function(error){
          vm.state = vm.states.resetPasswordError;
          vm.error = error.message;
        })
    }

    function authenticate(credentials) {
      AuthenticationService.authenticate(credentials.email, credentials.password)
        .then(function(){
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

    function forgotPassword(email){
      if (!email){
        vm.state = vm.states.invalidEmail;
        return;
      }

      AuthenticationService
        .forgotPassword(email)
        .then(function(){
          vm.state = vm.states.forgotPasswordSuccess;
        }, function(error){
          vm.state = vm.states.forgotPasswordError;
          vm.error = error.message;
        });
    }

  }

  LoginCtrl.$inject = ['AuthenticationService', 'UserService', '$state'];


  angular.module('youomi').controller('LoginCtrl', LoginCtrl);
})();
