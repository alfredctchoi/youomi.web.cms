(function(){

'use strict';

angular.module('youomi.core').factory('HttpInterceptor', HttpInterceptor);

function HttpInterceptor(configs, SessionService){
  var interceptor = {};
  interceptor.request = request;

  return interceptor;

  function request (config) {
    var session = SessionService.getSession();

    config.headers[configs.appTokenHeaderKey] = configs.appKey;

    if (session){
      config.headers[configs.userIdHeaderKey] = session.user.id;
      config.headers[configs.authTokenHeaderKey] = session.guid;
    }

    return config;
  }
}

HttpInterceptor.$inject = ['configs', 'SessionService'];

})();
