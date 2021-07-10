var express = require("express");
var router = express.Router();

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
router.post('/add',function(req,res,next){
    // แสดงค่าที่กรอกใน form 
    // (req.body.name) = ร้องขอสิ่งที่เราต้องการไปยังส่วน body ของเว็บไซต์ แล้วเข้าถึงส่วนที่เราต้องการ
    console.log(req.body.name);
    console.log(req.body.description);
    // res.render("addblog");
});


module.exports = router;