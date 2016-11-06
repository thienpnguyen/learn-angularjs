(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/components/items.component.html',
  bindings: {
    items: '<'
  }
});


})();
