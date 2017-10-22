app.controller('loginCtrl',function($scope,myService,$state){
    $scope.user = {};
    $scope.login = function() {
        $scope.authError = null;
        $scope.authError = "登陆中...";
        if($scope.user.password.length>=6){
            myService.login($scope.user,function (result) {
                if(result.code==200){
                    localStorage.setItem("realName",result.data.realName);
                    if($scope.user.degree == 1){
                        localStorage.setItem("degree",1);
                        localStorage.setItem("userId",result.data.managerId);
                        localStorage.setItem("superManage",result.data.superManage);
                    }else if($scope.user.degree == 2){
                        localStorage.setItem("degree",2);
                        localStorage.setItem("userId",result.data.stuId);
                    }
                    $scope.app.degree = localStorage.getItem("degree");
                    $scope.app.userId = localStorage.getItem("userId");
                    $scope.app.realName = localStorage.getItem("realName");
                    $scope.app.superManage = localStorage.getItem("superManage") ? localStorage.getItem("superManage") : "";
                    // console.log($scope.app.realName,$scope.app.userId,$scope.app.degree,$scope.app.superManage)
                    $state.go('app.home',{},{reload:true});
                }else {
                    $scope.authError = result.msg;
                }
            });
        }else{
            $scope.authError = "密码至少6位！";
        }
    };
});
