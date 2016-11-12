(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;

  service.userInfo = null;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getMenuItem = function (short_name) {
    return $http.get(ApiPath + '/menu_items/' + short_name + '.json').then(function (response) {
      return response.data;
    });
  };

  service.signupNewsLetter = function (firstName, lastName, email, phoneNumber, favoriteMenuId ) {
    return service.getMenuItem(favoriteMenuId).then(function (favoriteMenuInfo) {

      // save signup information
      service.userInfo = {
        "firstname": firstName,
        "lastname": lastName,
        "email": email,
        "phone": phoneNumber,
        "menuId": favoriteMenuId
      };

      return true;
    });
  };

  service.getUserInfo = function () {
    if( service.userInfo == null) {
      return null;
    }

    var obj = {
      "firstname": service.userInfo.firstname,
      "lastname": service.userInfo.lastname,
      "email": service.userInfo.email,
      "phone":service.userInfo.phone,
      "menuId":service.userInfo.menuId,
    };

    return obj;
  };

}



})();
