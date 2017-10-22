'use strict';

/* Controllers */
// signin controller
app.controller('NavController', function ($rootScope, $scope, $localStorage,$state) {


})
;
app.controller('logoutCtrl', function ($scope, $localStorage, $state) {

    $scope.logout = function () {

        localStorage.setItem("degree","");
        localStorage.setItem("userId","");
        localStorage.setItem("realName","");
        if(localStorage.getItem("superManage")){
            localStorage.setItem("superManage","");
        }

        $state.go('auth.login');

    };
});


