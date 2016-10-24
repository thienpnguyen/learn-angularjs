(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var showList = this;

    ShoppingListCheckOffService.setItems(
        [
            {name:"cookie", quantity:1},
            {name:"candy", quantity:2},
            {name:"pen", quantity:3},
            {name:"pencil", quantity:4},
            {name:"noodle", quantity:5}         
        ]
    );
  
    showList.items = ShoppingListCheckOffService.getItems();

    showList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var boughtList = this; 
    boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
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
