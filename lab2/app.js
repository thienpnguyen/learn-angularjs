(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);


ToBuyController.$inject = ['ShoppingListService'];
function ToBuyController(ShoppingListService) {
    var showList = this;

    ShoppingListService.setItems(
        [
            {name:"cookie", quantity:1},
            {name:"candy", quantity:2},
            {name:"pen", quantity:3},
            {name:"pencil", quantity:4},
            {name:"noodle", quantity:5}         
        ]
    );
  
    showList.items = ShoppingListService.getItems();

    showList.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
    var boughtList = this; 
    boughtList.items = ShoppingListService.getBoughtItems();
}


function ShoppingListService() {
    var service = this;

    // List of shopping items
    var items = [];
    var boughtItems = [];

    service.setItems = function (arrayItems) {
        items.length = 0;
        for(var i=0; i < arrayItems.length; i++)
        {
            items.push(arrayItems[i]);
        }
    };
  
    service.addItem = function (itemName, quantity) {
        var item = {
            name: itemName,
            quantity: quantity
        };
        items.push(item);
    };

    service.removeItem = function (itemIdex) {
        boughtItems.push(items[itemIdex]);
        items.splice(itemIdex, 1);
    };

    service.getItems = function () {
        return items;
    };
  
    service.getBoughtItems = function () {
        return boughtItems;
    };
}

})();
