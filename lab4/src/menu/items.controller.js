(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['categoryInfo'];
function ItemsController(categoryInfo) {
  var itemsCtrl = this;
  itemsCtrl.categoryInfo = categoryInfo;
}

})();
