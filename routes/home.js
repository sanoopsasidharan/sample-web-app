const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
        if(req.session.login){
                console.log('001');
                res.render('home')
                
        }else{
                res.render('login')
        }
})

module.exports = router;
