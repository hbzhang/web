'use strict';

angular.module('mean.account').controller('AccountController', ['$scope', 'Global', 'Account',
  function($scope, Global, Account) {
    $scope.global = Global;
    $scope.package = {
      name: 'account'
    };
  }
]);
