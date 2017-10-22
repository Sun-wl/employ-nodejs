var express = require('express');
var dbUtil = require("dbUtil");
var router = express.Router();


router.get('/getPasterns', function(req, res) {
    var sql = "select * from Pasterns";
    var arr = [];
    dbUtil.execute(sql, arr, function (result) {
            // console.log(result);
            res.json({
                code: 200,
                data: result
            })
        });
});


module.exports = router;