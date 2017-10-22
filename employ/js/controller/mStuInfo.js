/**
 * Created by 大大大太阳 on 2017/3/18.
 */
app
    .controller("mStuInfo", function ($scope, myService, $stateParams, $state) {
        if(!$scope.app.degree || !$scope.app.userId){
            $state.go('auth.login');
        }
        $scope.form = {};
        $scope.stus = {};
        $scope.start = 0;
        $scope.form.currentPage = 1;
        $scope.maxSize = 5;
        $scope.bigTotalItems = 1;

        //“学生就业信息查询” 获取学生就业信息
        function getStus() {
            myService.getStus($scope, function (result) {
                $scope.bigTotalItems = result.recordsTotal;
                $scope.lastStart = parseInt(result.recordsTotal/10)*10;
                $scope.stus = result.data;
            });
        }
        getStus();
        //翻页
        $scope.pageChanged = function () {
            $scope.start = ($scope.form.currentPage-1)*10;
            getStus();
        };
        $scope.search = function () {
            getStus();
        };

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
        $scope.changePast = function () {
            $scope.form.profId = "";
            $scope.form.clazz = "";
        };
        $scope.changeProf = function () {
            $scope.form.clazz = "";
        };


    });
app
    .controller("stuEmployInfoCtrl", function ($scope, myService, $state) {

        $scope.del = function (stuId) {
            if (confirm("确定删除？")) {
                myService.delStuInfo(stuId,function (result) {
                    if(result.code == 200){
                        $state.go("app.mStuInfo.stuEmployInfo.list", {}, {reload: true})
                    }
                });
            }
        }


    });
app
    .controller("addStuInfoCtrl", function ($scope, myService, $stateParams, $state) {
        $scope.changeStuId = function () {
            $scope.form.grade = String(+$scope.form.stuId.substr(0,2)+4);
            $scope.form.pasternId = $scope.form.stuId.substr(3,2);
            $scope.form.profId = $scope.form.stuId.substr(3,3);
            $scope.form.clazz = $scope.form.stuId.substr(0,7);
        }
        $scope.save = function () {
            $scope.form.sex = $("input[name=sex]:checked").val();
            var stuIdStrLen = String($scope.form.stuId).length;
            var stuIdStr = String($scope.form.stuId).substr(0, 7);
            if (!$scope.form.sex) {
                alert("请选择毕业生性别");
                return
            }
            if (stuIdStr != $scope.form.clazz) {
                alert("班级与学号不对应");
                return
            }
            if (stuIdStrLen != 9) {
                alert("学号不正确");
                return
            }
            if ($scope.form.direction != 1) {
                if (!$scope.form.employProv) {
                    alert("请选择毕业生就业省份");
                    return
                }
                if (!$scope.form.employCompany) {
                    alert("请输入就业单位");
                    return
                }
            }else{
                $scope.form.employProv = undefined;
                $scope.form.employCompany = undefined;
            }
            myService.saveStuInfo($scope.form, function (result) {
                if (result.code == 200) {
                    $state.go("app.mStuInfo.addStuInfo.list", {}, {reload: true})
                }
            });
        }
    });
app
    .controller("updateStuInfoCtrl", function ($scope, myService, $stateParams,$state) {

        //获取学生毕业生信息详情信息
        myService.getStu($stateParams.stuId, function (result) {
            $scope.form = result.data;
            if($scope.form.sex == "男"){
                $("#man").attr("checked","checked");
            }else{
                $("#woman").attr("checked","checked");
            }
        });

        $scope.save = function () {
            $scope.form.sex = $("input[name=sex]:checked").val();
            if ($scope.form.direction != 1) {
                if (!$scope.form.employProv) {
                    alert("请选择毕业生就业省份");
                    return
                }
                if (!$scope.form.employCompany) {
                    alert("请输入就业单位");
                    return
                }
            }else{
                $scope.form.employProv = undefined;
                $scope.form.employCompany = undefined;
            }
            myService.updateStuInfo($stateParams.stuId,$scope.form, function (result) {
                if (result.code == 200) {
                    $state.go("app.mStuInfo.stuEmployInfo.list", {}, {reload: true})
                }
            });
        }



    });