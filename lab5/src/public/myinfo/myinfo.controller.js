(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['userInfo', 'menuItem'];
function MyinfoController(userInfo,menuItem) {
  var infoCtrl = this;
  infoCtrl.userInfo = userInfo;
  infoCtrl.menuItem = menuItem;
}


})();
