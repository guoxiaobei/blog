var express = require('express');
var router = express.Router();

var mongodb=require('mongodb').MongoClient;
var db_str='mongodb://localhost:27017/blog'

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register',function (req,res,next) {
  var user=req.body['user']
  var pwd=req.body['pwd']
  var insertData = function (db,callback) {
      var conn = db.collection('register')
      var data=[{name:user,pass:pwd}]
      conn.insert(data,function (err,result) {
          if(err){
            console.log('insert失败')
          }else{
            callback(result)
          }
      })
  }
    mongodb.connect(db_str,function (err,db) {
        if(err){
            console.log(err)
        }else{
            console.log('success')
        }
        insertData(db,function (result) {
            console.log(result)
            res.redirect('/')//重新定义路由路径
            db.close()//关闭数据库
        })
    })
})
router.post('/login',function (req,res,next) {
    var zh=req.body['user']
    var pwd=req.body['pwd']
    //封装读取momgo数据的函数
    var findData=function (db,callback) {
        var conn=db.collection('register')
        var data={name:zh,pass:pwd}
        conn.find(data).toArray(function (err,result) {
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
            console.log('success')
            findData(db,function (result) {
                console.log(result)
                if(result.length>0){
                    //res.send('登录成功')
                   req.session.user=result[0].name;
                    //在session上存了一个user=result[0].name键值对
                    res.redirect('/')//重新定义路由路径
                    db.close()
                }else{
                    res.redirect('/');
                    db.close()//关闭数据库
                }
            })
        }
    })


})
router.post('/liuyan',function (req,res,next) {
    //先把留言内容插进数据库
    var t=req.body['title']
    var c=req.body['content']
    var insertData = function (db,callback) {
        var conn = db.collection('liuyan')
        var data=[{title:t,content:c}]
        conn.insert(data,function (err,result) {
            if(err){
                console.log('insert失败')
            }else{
                callback(result)
            }
        })
    }
    mongodb.connect(db_str,function (err,db) {
        if(err){
            console.log(err)
        }else{
            console.log('success')
        }
        insertData(db,function (result) {
            console.log(result)
            res.redirect('/liuyan')//重新定义路由路径
            db.close()//关闭数据库
        })
    })

})
module.exports = router;
