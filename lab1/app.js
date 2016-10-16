(function () {
    'use strict';

    angular.module('LunchCheck', [])
           .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.lunchMenu = "";
        $scope.resultMsg = "";

        $scope.submit = function () {
            var numItem = 0;
            if( $scope.lunchMenu )
            {
                var items = $scope.lunchMenu.split(",");
                numItem = items.length;
            }
            
            
            if( numItem == 0)
                $scope.resultMsg = "Please enter data first";
            else if( numItem <= 3)
                $scope.resultMsg = "Enjoy!";
            else
                $scope.resultMsg = "Too much!";

        };

    }
    
})();
