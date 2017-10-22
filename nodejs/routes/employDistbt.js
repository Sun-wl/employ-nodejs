var express = require('express');
var dbUtil = require("dbUtil");
var router = express.Router();


router.get('/getEmployDistbt', function (req, res) {
    var form = req.query || "";
    var datas = [];
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

    dbUtil.execute("select * from Provinces", [], function (result) {
        for (var i = 0; i < result.length; i++) {
            datas[i] = {
                provinceId: result[i].provinceId,
                originNum: 0,            //生源所在地人数
                pendEmployNum: 0,        //本省待就业人数
                employNum: 0,            //本省已就业人数
                originEmployNum: 0,      //在本生源地就业人数
                unOriginEmployNum: 0,    //非本生源地就业人数
                employProvNum: 0         //单位所在地人数
            }
        }

        dbUtil.execute(sql, arr, function (result) {
            var stus = result;
            for (var j = 0; j < datas.length; j++) {
                for (var k = 0; k < stus.length; k++) {
                    //生源所在地人数
                    if (stus[k].origin == datas[j].provinceId) {
                        datas[j].originNum++;
                        if(stus[k].direction==1){
                            datas[j].pendEmployNum++;
                        }else{
                            datas[j].employNum++;
                            if(stus[k].employProv == datas[j].provinceId){
                                datas[j].originEmployNum++;
                            }else{
                                datas[j].unOriginEmployNum++;
                            }
                        }
                    }
                    if(stus[k].employProv == datas[j].provinceId){
                        datas[j].employProvNum++;
                    }
                }
            }
            res.json({
                code: 200,
                data: datas
            })
        });
    });


});


module.exports = router;