var express = require('express');
var dbUtil = require("dbUtil");
var router = express.Router();


//过滤器，中间件
router.use("/",function (req, res, next) {
    //将session中的学生信息维护到locals中，为了能够让jade直接访问到
    // res.locals.user = req.session.user;
    next();
});

//登录
router.post("/login",function(req, res, next) {
    var user = req.body.data || "";
    if(user.degree == 1){
        var sql = "select * from Managers where managerId = ?";
    }else if(user.degree == 2){
        var sql = "select * from Stus where stuId = ?";
    }
    dbUtil.execute(sql,[user.userId],function (result) {
        // console.log(result)
        if(result && result.length>0){
            var getUser = result[0];
            // console.log(result);
            if(user.password == getUser.password){
                // 登录成功
                res.json({
                    code:200,
                    data:getUser
                });
            } else {
                // 密码不匹配
                res.json({
                    msg:"密码不匹配！"
                })
            }
        } else {
            // 用户不存在
            res.json({
                msg:"用户不存在！"
            });
        }
    });

});



module.exports = router;
