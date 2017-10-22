var express = require('express');
var dbUtil = require("dbUtil");
var router = express.Router();



router.post('/', function (req, res, next) {
    //将数据保存到数据库中
    var user = req.body.data || "";
    if(user.degree == 1){
        var sql = "update Managers set password = ? where managerId = ?";
    }else if(user.degree == 2){
        var sql = "update Stus set password = ? where stuId = ?";
    }
    var arr = [user.password, user.userId];
    dbUtil.execute(sql, arr, function (result) {
        console.log(result)
        if(result.affectedRows){
            res.json({
                code: 200,
                msg: "修改成功！"
            })
        }

    });


})

module.exports = router;