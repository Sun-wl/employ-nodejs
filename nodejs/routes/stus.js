var express = require('express');
var dbUtil = require("dbUtil");
var router = express.Router();

router.get('/stuInfo', function (req, res) {
    var form = req.query || "";
    var sql = "select * from Stus";
    var arr = [];
    if (form.pasternId || form.profId || form.grade || form.clazz || form.realName || form.stuId || form.origin || form.direction || form.employProv) {
        sql += " where ";
        if (form.pasternId) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "pasternId = ? ";
            arr.push(form.pasternId);
        }
        if (form.profId) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "profId = ? ";
            arr.push(form.profId);
        }
        if (form.grade) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "grade = ? ";
            arr.push(form.grade);
        }
        if (form.clazz) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "clazz = ? ";
            arr.push(form.clazz);
        }
        if (form.realName) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "realName = ? ";
            arr.push(form.realName);
        }
        if (form.stuId) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "stuId = ? ";
            arr.push(form.stuId);
        }
        if (form.origin) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "origin = ? ";
            arr.push(form.origin);
        }
        if (form.direction) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "direction = ? ";
            arr.push(form.direction);
        }
        if (form.employProv) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "employProv = ? ";
            arr.push(form.employProv);
        }
    }
    dbUtil.execute(sql, arr, function (result) {
        var stus = [];
        if(result && result.length>0){
            for(var i=0;i<result.length;i++){
                if(result[i].direction){
                    stus.push(result[i]);
                }
            }
            //按学号排序
            stus.sort((function(key){
                return function(a,b){
                    if(a[key] < b[key]){
                        return -1;
                    }else if(a[key] > b[key]){
                        return 1;
                    }else{
                        return 0;
                    }
                }
            })("stuId"));
            var a = stus.slice(form.start, form.start + form.length);
            res.json({
                code: 200,
                data: a,
                recordsTotal: stus.length
            })
        }else if(result.length == 0){
            res.json({
                code: 200,
                data: [],
                recordsTotal: 0
            })
        }
    });
});

router.get('/stuDetial/:stuId', function (req, res) {
    var stuId = req.params.stuId || "";
    dbUtil.execute("select * from Stus where stuId = ?", [stuId], function (result) {
        if(result && result.length > 0){
            res.json({
                code: 200,
                data: result[0]
            })
        }else if(result.length = 0){
            res.json({
                code: 200,
                data: []
            })
        }

    });

});

router.post('/saveStuInfo', function (req, res, next) {
    //将数据保存到数据库中
    var stu = req.body || "";
    dbUtil.execute("select * from Stus where stuId = ?", [stu.stuId], function (result) {
        if (result && result.length > 0 && result[0].direction) {
            res.json({
                code: 300,
                msg: "该生就业信息已录入"
            })
        }  else if(result && result.length > 0 && !result[0].direction){
            var sql = "update Stus set realName = ?, sex = ?, pasternId = ?, profId = ?, grade = ?, clazz = ?, origin = ?,direction = ?,employProv = ?,employCompany = ? where stuId = ?";
            var arr = [stu.realName, stu.sex, stu.pasternId, stu.profId, stu.grade, stu.clazz, stu.origin, stu.direction, stu.employProv, stu.employCompany, stu.stuId];
            dbUtil.execute(sql, arr, function (result) {
                if(result.affectedRows){
                    res.json({
                        code: 200,
                        msg: "提交成功！"
                    })
                }
            });
        }else if(result && result.length == 0){
            var sql = "insert into Stus (stuId, realName, sex, pasternId, profId, grade, clazz, origin, direction, employProv, employCompany) select ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? from dual where not exists (select * from Stus where Stus.stuId = ?)";
            var arr = [stu.stuId, stu.realName, stu.sex, stu.pasternId, stu.profId, stu.grade, stu.clazz, stu.origin, stu.direction, stu.employProv, stu.employCompany, stu.stuId];
            dbUtil.execute(sql, arr, function (result) {
                if (result.affectedRows) {
                    res.json({
                        code: 200,
                        msg: "添加成功"
                    })
                }

            });
        }

    });
})

router.post('/updateStuInfo/:stuId', function (req, res, next) {
    //将数据保存到数据库中
    var stuId = req.params.stuId || "";
    var stu = req.body.data || "";
    var sql = "update Stus set realName = ?,sex = ?,origin = ?,direction = ?,employProv = ?,employCompany = ? where stuId = ?";
    var arr = [stu.realName, stu.sex, stu.origin, stu.direction, stu.employProv, stu.employCompany, stuId];
    dbUtil.execute(sql, arr, function (result) {
        if(result.affectedRows){
            res.json({
                code: 200,
                msg: "修改成功！"
            })
        }

    });

})

router.get('/delStuInfo/:stuId/', function (req, res) {
    var stuId = req.params.stuId;
    dbUtil.execute("delete from Stus where stuId = ?", [stuId], function (result) {
        if(result.affectedRows){
            res.json({
                code: 200,
                msg: "删除成功"
            })
        }
    });
});

module.exports = router;