var express = require('express');
var dbUtil = require("dbUtil");
var router = express.Router();


router.get('/getClazzs', function(req, res) {
    var sql = "select * from Clazzs";
    var arr = [];
    dbUtil.execute(sql, arr, function (result) {
            res.json({
                code: 200,
                data: result
            })
        });
});


module.exports = router;