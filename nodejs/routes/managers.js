var express = require('express');
var dbUtil = require("dbUtil");
var router = express.Router();

router.get('/getManagers', function (req, res) {
    var form = req.query || "";
    var sql = "select * from Managers";
    var arr = [];
    if (form.managerId || form.realName) {
        sql += " where ";
        if (form.managerId) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "managerId = ? ";
            arr.push(form.managerId);
        }
        if (form.realName) {
            if (sql.indexOf("?") >= 0) {
                sql += "and ";
            }
            sql += "realName = ? ";
            arr.push(form.realName);
        }
    }
    dbUtil.execute(sql, arr, function (result) {
        if (result && result.length > 0) {
            var a = result.slice(form.start, form.start + form.length);
            res.json({
                code: 200,
                data: a,
                recordsTotal: result.length
            })
        } else if (result.length == 0) {
            res.json({
                code: 200,
                data: [],
                recordsTotal: 0
            })
        }
    });
});

router.post('/addManager', function (req, res, next) {
    //将数据保存到数据库中
    var manager = req.body || "";
    var sql = "insert into Managers (managerId, realName) select ?, ? from dual where not exists (select * from Managers where Managers.managerId = ?)";
    dbUtil.execute(sql, [manager.managerId, manager.realName, manager.managerId], function (result) {
        if (result && result.affectedRows) {
            res.json({
                code: 200,
                msg: "添加成功"
            })
        }else if(!result.affectedRows){
            res.json({
                code: 300,
                msg: "该工号已是管理员账号"
            })
        }

    });
})

router.get('/delManager/:managerId/', function (req, res) {
    var managerId = req.params.managerId;
    if (managerId) {
        var sql = "delete from Managers where managerId = ?";
        dbUtil.execute(sql, [managerId], function (result) {
            if (result.affectedRows) {
                res.json({
                    code: 200,
                    msg: "删除成功"
                })
            }
        });
    }
});

module.exports = router;