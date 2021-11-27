var express = require('express');
var router = express.Router();
var helper = require('../helper/user')

let alreadyIn=false;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.login){
    res.redirect('/home')
    console.log('this is home is get')
  }else{
    
    // res.render('userLogin');
    console.log('this is other');
    res.render('userLogin', {alreadyIn})
    alreadyIn=false;
  }
  
});

router.post('/',(req,res)=>{
 
   req.body.isactive = true;
  
  //tansfer the data in signup 
  helper.signup(req.body).then((err)=>{
    console.log(err);
    if(err){
      alreadyIn=true;
       
     res.redirect("/signup");



      // if(req.session.login){
      //   res.redirect('/')
      

      // }else{
      //   alreadyIn=true;
       
      //   res.redirect("/signup");
      // }
     
    }else{
      // req.session.login=true;
      console.log('home secuss');
      console.log('this is 2 post');
      res.redirect('/')
    }
 
  })  

})

module.exports = router;
