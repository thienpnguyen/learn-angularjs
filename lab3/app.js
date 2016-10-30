(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController )
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      items: '<',
      errMsg: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var list = this;
  // add more in future
}



NarrowItDownController .$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var menu = this;
  menu.searhTerm = "";
  menu.found = [];
  menu.hasResult = false;
  menu.errMsg = "";

  menu.searchMenuItems = function () {
    menu.errMsg = ""
    var promise = MenuSearchService.getMatchedMenuItems(menu.searhTerm);

    promise.then(function (items) {
      menu.found = items;
      menu.hasResult = true;
    })
    .catch(function (error) {
      menu.hasResult = true;
      menu.errMsg = "NarrowItDownController: Something went terribly wrong.";
      console.log(menu.errMsg, error);
    });
  };
  
  menu.removeItem = function (index) {
    //console.log("removeItem:'this' is: ", this);
    menu.found.splice(index, 1);
  };
  

}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return  $http({
                    method: "GET",
                    url: (ApiBasePath + "/menu_items.json")
                  })
            .then(function (response) {
                    var foundItems = [];   
                    if(!searchTerm) {
                      return foundItems;
                    }
                    
                    searchTerm = searchTerm.toLowerCase();                    
                    var items = response.data.menu_items;
                    for( var i =0; i < items.length; i++){
                      var desc = items[i].description.toLowerCase();
                      if( desc.indexOf(searchTerm) != -1 ) {
                        foundItems.push(items[i]);
                      }
                    }
                      
                    return foundItems;
                  });
                  
  };

}

})();
