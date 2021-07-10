var express = require("express");
var router = express.Router();
// import validation ที่เราติดตั้ง
const {check, validationResult } = require('express-validator');

// import monk ที่เราติดตั้ง
// Connection URL
// ใช้ MongoDB Atlas โดย 'TutorialDB' คือชื่อ database ที่เราสร้าง
const db = require('monk')('mongodb+srv://dbUser:oil12345@cluster0.aibjb.mongodb.net/TutorialDB');


router.get('/',function(req,res,next){
    // ระบุชื่อไฟล์ที่ต้องการให้แสดงในโฟลเดอร์ views
    // block.ejs
    res.render("blog");
});
router.get('/add',function(req,res,next){
    // addblog.ejs
    res.render("addblog");
});
// รับค่าจาก form
router.post('/add',[
    // ถ้าตรวจสอบแล้ว name เป็นค่าว่างจะให้ทำอะไร
    // check คือตัวแปรที่ประกาศไว้ด้านบน
    check("name","กรุณาใส่ชื่อบทความ").not().isEmpty(),
    check("description","กรุณาใส่รายละเอียด").not().isEmpty(),
    check("author","กรุณาใส่ชื่อผู้แต่ง").not().isEmpty()
],function(req,res,next){
    /* แสดงค่าที่กรอกใน form 
    (req.body.name) = ร้องขอสิ่งที่เราต้องการไปยังส่วน body ของเว็บไซต์ แล้วเข้าถึงส่วนที่เราต้องการ
    console.log(req.body.name);
    console.log(req.body.description);
    */

    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
        //  ถ้ามี error ให้แสดง
        res.render('addblog',{errors:errors});
    }else{
        // insert to MongoDB
        // db.get('ชื่อ collection name ใน mongoDB ที่เราสร้าง')
        var collection = db.get('blogs');
        collection.insert({
            // จับคู่การรับค่า (key : value)
            // column name จับคู่กับค่าที่ได้จาก object name ใน form ที่เรากรอกข้อมูล
            name:req.body.name,
            description:req.body.description,
            author:req.body.author
        },function(err,blog){
            if (err) {
                res.send(err);
            }else{
                res.location('/blog/add');
                res.redirect('/blog/add');
            }
        });
    }
});


module.exports = router;