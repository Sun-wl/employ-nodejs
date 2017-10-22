/**
 * Created by 大大大太阳 on 2017/3/19.
 */
app
    .controller("mEmployCountCtrl", function ($scope, myService, $state) {
        if(!$scope.app.degree || !$scope.app.userId){
            $state.go('auth.login');
        }
        $scope.form = {}
        //获取系部信息
        myService.getPasterns(function (result) {
            $scope.pasterns = result.data;
        });
        //获取专业信息
        myService.getProfs(function (result) {
            $scope.profs = result.data;
        });
        //获取班级信息
        myService.getclazzs(function (result) {
            $scope.clazzs = result.data;
        });
        //获取省份信息
        myService.getProvinces(function (result) {
            $scope.provinces = result.data;
        });
    });
app
    .controller("employDistbtCtrl", function ($scope, myService, $state) {
        $scope.form = {}
        function getEmployDistbt() {
            $scope.originNum = 0;
            $scope.pendEmployNum = 0;
            $scope.employNum = 0;
            $scope.originEmployNum = 0;
            $scope.unOriginEmployNum = 0;
            $scope.employProvNum = 0;
            myService.getEmployDistbt($scope, function (result) {
                $scope.employDistbts = result.data;
                $scope.employDistbts.forEach(function (item) {
                    $scope.originNum += item.originNum;
                    $scope.pendEmployNum += item.pendEmployNum;
                    $scope.employNum += item.employNum;
                    $scope.originEmployNum += item.originEmployNum;
                    $scope.unOriginEmployNum += item.unOriginEmployNum;
                    $scope.employProvNum += item.employProvNum;
                })
            });
        }
        getEmployDistbt();
        $scope.search = function () {
            getEmployDistbt()
        }

    });
app
    .controller("employRateCtrl", function ($scope, myService, $state) {
        $scope.form = {}
        function getEmployRate() {
            myService.getEmployRate($scope, function (result) {
                $scope.employRateInfo = result.data;
            });
        }
        getEmployRate();
        $scope.search = function () {
            getEmployRate()
        }
    });