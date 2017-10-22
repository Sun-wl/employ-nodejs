/**
 * Created by 大大大太阳 on 2017/3/19.
 */
app
    .controller("sPersonalInfoCtrl", function ($scope, myService, $state) {
        if(!$scope.app.degree || !$scope.app.userId){
            $state.go('auth.login');
        }
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

        //获取学生毕业生信息详情信息
        myService.getStu($scope.app.userId, function (result) {
            $scope.form = result.data;
            $scope.form.grade = String(+$scope.app.userId.substr(0,2)+4);
            $scope.form.pasternId = $scope.app.userId.substr(3,2);
            $scope.form.profId = $scope.app.userId.substr(3,3);
            $scope.form.clazz = $scope.app.userId.substr(0,7);
            $scope.isAdd = !!$scope.form.direction
            if($scope.form.sex == "男"){
                $("#man").attr("checked","checked");
            }else if($scope.form.sex == "女"){
                $("#woman").attr("checked","checked");
            }
        });

        $scope.changePast = function () {
            $scope.form.profId = "";
            $scope.form.clazz = "";
        };
        $scope.changeProf = function () {
            $scope.form.clazz = "";
        };


        $scope.addInfo = function () {
            $scope.form.stuId = $scope.app.userId;
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
                    localStorage.setItem("realName",$scope.form.realName);
                    $state.go("app.sPersonalInfo.personalInfo.list", {}, {reload: true})
                }
            });
        }

        $scope.updateInfo = function () {
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
            myService.updateStuInfo($scope.app.userId,$scope.form, function (result) {
                if (result.code == 200) {
                    localStorage.setItem("realName",$scope.form.realName);
                    $state.go("app.sPersonalInfo.personalInfo.list", {}, {reload: true})
                }
            });
        }

    });
