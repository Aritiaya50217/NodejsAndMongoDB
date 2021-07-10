var express = require("express");
var router = express.Router();
// import validation ที่เราติดตั้ง
const {check, validationResult } = require('express-validator');

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
    check("description","กรุณาใส่รายละเอียด").not().isEmpty()
],function(req,res,next){
    /* แสดงค่าที่กรอกใน form 
    (req.body.name) = ร้องขอสิ่งที่เราต้องการไปยังส่วน body ของเว็บไซต์ แล้วเข้าถึงส่วนที่เราต้องการ
    console.log(req.body.name);
    console.log(req.body.description);
    */

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        //  ถ้ามี error ให้แสดง
       console.log(errors);
    }else{
        // insert to DB
    }
});


module.exports = router;