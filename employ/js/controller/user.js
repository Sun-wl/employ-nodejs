/**
 * Created by 大大大太阳 on 2017/3/18.
 */
app
    .controller("user", function ($scope, myService, $stateParams, $state) {
        $scope.form = {};
        if(!$scope.app.degree || !$scope.app.userId){
            $state.go('auth.login');
        }
    });
app
    .controller("passwordUpdateCtrl", function ($scope, myService, $state) {

        $scope.save = function () {
            if($scope.form.password.length>=6 && $scope.form.password == $scope.form.password2){
                $scope.form.degree = $scope.app.degree;
                $scope.form.userId = $scope.app.userId;
                myService.passwordUpdate($scope.form,function (result) {
                    if(result.code == 200){
                        $state.go('app.home',{},{reload:true});
                    }
                })
            }else{
                alert("两次密码不一致")
            }
        }

    });
app
    .controller("manageListCtrl", function ($scope, myService, $state) {
        $scope.form = {}
        $scope.start = 0;
        $scope.form.currentPage = 1;
        $scope.maxSize = 5;
        $scope.bigTotalItems = 1;
        function getManagers() {
            myService.getManagers($scope,function (result) {
                $scope.managers = result.data;
                $scope.bigTotalItems = result.recordsTotal;
                $scope.lastStart = parseInt(result.recordsTotal/10)*10;

            })
        }
        getManagers();
        //翻页
        $scope.pageChanged = function () {
            $scope.start = ($scope.form.currentPage-1)*10;
            getManagers();
        };
        $scope.search = function () {
            getManagers();
        }
        $scope.del = function (managerId) {
            if (confirm("确定删除？")) {
                myService.delManager(managerId,function (result) {
                    if(result.code == 200){
                        $state.go("app.user.managerDefend.list",{},{reload:true})
                    }
                })
            }

        }

    });
app
    .controller("managerAddCtrl", function ($scope, myService, $stateParams, $state) {
        $scope.save = function () {
            myService.addManager($scope.form,function (result) {
                if(result.code == 200){
                    $state.go("app.user.managerDefend.list",{},{reload:true});
                }
            })
        }


    });