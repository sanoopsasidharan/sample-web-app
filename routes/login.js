var express = require('express');
var router = express.Router();
var helper = require('../helper/user')
let erroruser=false;




router.get('/',(req,res)=>{
  
  if(req.session.login){
    
    
   
    console.log('get home'+ req.session.login);
   
  
    console.log('1');
    res.render('home')
}else{
 

  
  
    res.render('login',{erroruser})
    console.log('2');
    erroruser=false

}
  
})

router.post('/',(req,res)=>{
  helper.Login(req.body).then((rbody)=>{
  
    console.log("Rboyd:"+rbody);

    
    if(rbody){
      console.log('3');
      req.session.login=true;
      res.redirect('/')
    }else{
      erroruser = true;
      // rederact in /

      console.log("4");
      res.redirect('/')
    }

  }).catch((e)=>{
    res.render('sorry')
  })
})

router.get('/logout',(req,res)=>{
  req.session.login = false;
  res.redirect('/');
})


router.get('/samples',(req,res)=>{
  res.render('samples')
})
router.get('/forms',(req,res)=>{
  res.render('formsample')
})
router.get('/done',(req,res)=>{
 
  res.render('s')
})

module.exports = router;
