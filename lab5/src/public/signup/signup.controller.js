(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var signupCtrl = this;

  signupCtrl.user = {
    "firstname": "",
    "lastname": "",
    "email": "",
    "phone": "",
    "menuId": ""
  };

  // signupCtrl.user = {
  //   "firstname": "John",
  //   "lastname": "Chang",
  //   "email": "t@t",
  //   "phone": "714-111-2222",
  //   "menuId": "C1"
  // };

  signupCtrl.submit = function () {
    console.log(signupCtrl.user);
    MenuService.signupNewsLetter(signupCtrl.user.firstname, signupCtrl.user.lastname,signupCtrl.user.email,signupCtrl.user.phone,signupCtrl.user.menuId )
      .then( function(isOk){
        signupCtrl.completed = true;
        if( isOk === true ) {
          signupCtrl.errMsg = "";
          signupCtrl.summaryMsg = "Your information has been saved.";
        }
        else {
          signupCtrl.errMsg = "No such menu number exists";
          signupCtrl.summaryMsg = "";
        }
      })
      .catch(function (error) {
        signupCtrl.errMsg = "No such menu number exists";
        signupCtrl.summaryMsg = "";
      });
  };

}


})();
