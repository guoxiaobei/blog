var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var db_str = 'mongodb://localhost:27017/blog'
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express',user:req.session.user });
});
router.get('/login',function (req,res,next) {
    res.render('login',{})
})
router.get('/out',function (req,res,next) {
    req.session.destroy(function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect("/")
        }
    })
})
router.get('/register',function (req,res,next) {
    res.render('register',{})
})
router.get('/liuyan',function (req,res,next) {
    //封装读取momgo数据的函数
    var findData=function (db,callback) {
        var conn=db.collection('liuyan')

        conn.find({}).toArray(function (err,result) {
            if(err){
                console.log(err)
            }else{
                callback(result)
            }
        })
    }

    mongodb.connect(db_str,function (err,db) {
        if(err){
            console.log(err)
        }else{
            console.log('测试数据库链接成功')
            findData(db,function (result) {
                console.log(result)
                res.render('liuyan',{result:result,user:req.session.user})
            })
        }
    })
})
router.get('/about',function (req,res,next) {
    res.render('about',{})
})
router.get('/article1',function (req,res,next) {
    res.render('article1',{})
})
module.exports = router;
