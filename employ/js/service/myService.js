/**
 * Created by 大大大太阳 on 2017/3/18.
 */

app.factory("myService", function ($http, Base64) {
    var baseUrl = 'http://192.168.31.129:8080/';
    return {
        //登录
        login: function (user, handler) {
            var password = Base64.encode(user.password);
            var arr = {
                degree: +user.degree,
                userId: user.userId,
                password: password
            };
            $http.post(baseUrl + "login", {
                data: arr
            }).success(function (result) {
                handler(result);
            });
        },
        //修改密码
        passwordUpdate: function (user, handler) {
            var password = Base64.encode(user.password);
            var arr = {
                degree: user.degree,
                userId: user.userId,
                password: password
            }
            $http.post(baseUrl + "passwordUpdate", {
                data: arr
            }).success(function (result) {
                alert(result.msg);
                handler(result);
            });
        },
        //获取系部
        getPasterns: function (handler) {
            $http.get(baseUrl + "pasterns/getPasterns")
            // $http.get("./data/pasterns.js")
                .success(function (result) {
                    handler(result);
                });
        },
        //获取专业
        getProfs: function (handler) {
            $http.get(baseUrl + "profs/getProfs")
            // $http.get("./data/prof.js")
                .success(function (result) {
                    handler(result);
                });
        },
        //获取班级
        getclazzs: function (handler) {
            $http.get(baseUrl + "clazzs/getClazzs")
            // $http.get("./data/clazz.js")
                .success(function (result) {
                    handler(result);
                });
        },
        //获取省份
        getProvinces: function (handler) {
            $http.get(baseUrl + "provinces/getProvinces")
            // $http.get("./data/province.js")
                .success(function (result) {
                    handler(result);
                });
        },
        //获取所有学生信息
        getStus: function ($scope, handler) {
            var arr = {
                start: $scope.start,
                length: 10,
                pasternId: $scope.form.pasternId,
                profId: $scope.form.profId,
                grade: $scope.form.grade,
                clazz: $scope.form.clazz,
                realName: $scope.form.realName,
                stuId: $scope.form.stuId,
                origin: $scope.form.origin,
                direction: $scope.form.direction,
                employProv: $scope.form.employProv
            };
            $http.get(baseUrl + "stus/stuInfo", {
                // $http.get("./data/stus.js", {
                params: arr
            }).success(function (result) {
                handler(result);
            });
        },
        //获取单个学生信息详情
        getStu: function (stuId, handler) {
            $http.get(baseUrl + "stus/stuDetial/" + stuId)
                .success(function (result) {
                    handler(result);
                })
        },
        //保存学生信息
        saveStuInfo: function (stu, handler) {
            stu = JSON.stringify(stu);
            $http.post(baseUrl + "stus/saveStuInfo", stu, {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).success(function (result) {
                alert(result.msg);
                handler(result);
            });
        },
        //修改学生信息
        updateStuInfo: function (stuId, stu, handler) {
            $http.post(baseUrl + "stus/updateStuInfo/" + stuId, {
                data: stu
            }).success(function (result) {
                alert(result.msg);
                handler(result);
            });
        },
        //删除学生信息
        delStuInfo: function (stuId, handler) {
            $http.get(baseUrl + "stus/delStuInfo/" + stuId)
                .success(function (result) {
                    handler(result)
                });
        },
        //获取就业率
        getEmployRate: function ($scope, handler) {
            var arr = {
                pasternId: $scope.form.pasternId,
                profId: $scope.form.profId,
                grade: $scope.form.grade,
                clazz: $scope.form.clazz
            };
            $http.get(baseUrl + "employRate/getEmployRate/", {
                params: arr
            }).success(function (result) {
                handler(result)
            });
        },
        //获取就业分布情况
        getEmployDistbt: function ($scope, handler) {
            var arr = {
                pasternId: $scope.form.pasternId,
                profId: $scope.form.profId,
                grade: $scope.form.grade,
                clazz: $scope.form.clazz
            };
            $http.get(baseUrl + "employDistbt/getEmployDistbt/", {
                params: arr
            }).success(function (result) {
                handler(result)
            });
        },
        //获取所有管理员信息信息
        getManagers: function ($scope,handler) {
            var arr = {
                start: $scope.start,
                length: 10,
                managerId:$scope.form.managerId,
                realName:$scope.form.realName
            };
            $http.get(baseUrl + "managers/getManagers",{
                params:arr
            }).success(function (result) {
                    handler(result);
                });
        },
        //删除管理员
        delManager: function (managerId, handler) {
            $http.get(baseUrl + "managers/delManager/" + managerId)
                .success(function (result) {
                    handler(result)
                });
        },
        //添加管理员
        addManager: function (manager, handler) {
            manager = JSON.stringify(manager);
            $http.post(baseUrl + "managers/addManager", manager, {
                header: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).success(function (result) {
                alert(result.msg);
                handler(result);
            });
        }
    }
});