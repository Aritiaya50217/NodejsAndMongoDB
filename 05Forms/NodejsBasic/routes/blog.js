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



module.exports = router;