var express = require('express');
var dbUtil = require("dbUtil");
var router = express.Router();


router.get('/getEmployRate', function(req, res) {
    var form = req.query || "";
    var sql = "select * from Stus";
    var arr = [];
    if (form.pasternId || form.profId || form.grade || form.clazz) {
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
    }

    dbUtil.execute(sql, arr, function (result) {
        var allNum = result.length;
        var unEmploy = [];
        var employ = [];
        var masterDegree = [];
        var civilServant = [];
        var other = [];
        for(var i=0;i<result.length;i++){
            if(result[i].direction == 1){
                unEmploy.push(result[i]);
            }
            if(result[i].direction == 2){
                employ.push(result[i]);
            }
            if(result[i].direction == 3){
                masterDegree.push(result[i]);
            }
            if(result[i].direction == 4){
                civilServant.push(result[i]);
            }
            if(result[i].direction == 5){
                other.push(result[i]);
            }
        }
        var unEmployNum = unEmploy.length;
        var employNum = employ.length;
        var masterDegreeNum = masterDegree.length;
        var civilServantNum = civilServant.length;
        var otherNum = other.length;
        if(allNum-unEmployNum){
            var employRate = ((allNum-unEmployNum)/allNum*100).toFixed(2) + "%";
        }else{
            var employRate = 0;
        }
        res.json({
            code: 200,
            data: {
                allNum:allNum,
                unEmployNum:unEmployNum,
                employNum:employNum,
                masterDegreeNum:masterDegreeNum,
                civilServantNum:civilServantNum,
                otherNum:otherNum,
                employRate:employRate
            }
        })
    });
});


module.exports = router;