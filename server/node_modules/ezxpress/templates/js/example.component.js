(function() {
  'use strict';

  angular
    .module('app')
    .component('exampleComponent', {
      templateUrl: '/js/component/example.template.html',
      controller: controller
    });

    controller.$inject = ['$http'];
    function controller($http) {
      const vm = this;

      vm.$onInit = function() {
        $http.get('/api/users').then(res => {
          vm.users = res.data;
        })
      }
    }
})();