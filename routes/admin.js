const { response } = require('express');
const express = require('express');
const router = express.Router();
const helper = require('../helper/user')
var getreqbody;
var loginerr= false;


router.get('/home',(req,res)=>{

    if(req.session.loged){
        console.log('01');
        res.render('adminHome')
    }else{
        console.log('02');
        res.redirect('/admin')
        // res.render('adminLog')
        console.log('login 1');
    }
    
})


// admin login page
router.get('/',(req,res)=>{
    
    if(req.session.loged){
        console.log('03');
        res.redirect('/admin/home')
    }else{
        
        console.log('04');
        res.render('adminLog',{loginerr});
        loginerr= false;
       
    }
})

router.post('/',(req,res)=>{
    helper.adminLogin(req.body).then((rbody)=>{
        getreqbody = rbody;

        if(getreqbody===null){
            // enter a
            loginerr=true;
            console.log('5');
            res.redirect('/admin')
            // loginerr=false;
         
        }else{
            req.session.loged=true;
            console.log('06');
           
            res.redirect('/admin')
        }
    })
})


router.get('/collections',(req,res)=>{
    if(req.session.loged){
        helper.getAllCollecions().then((collections)=>{
            res.render('collection',{admin:true,collections})
        })
    }else{
        res.redirect('/admin')
    } 
})

// add users
router.get('/adduser',(req,res)=>{
    if(req.session.loged){
        res.render('addUser');
    }else{
        res.redirect('/admin')
    }
  
})
router.post('/adduser',(req,res)=>{
helper.addUser(req.body)
res.redirect('/admin/collections')

})


router.get('/logout',(req,res)=>{
    req.session.loged = false
    res.redirect('/admin');
  })

  router.get('/delete/:id',(req,res)=>{
      let proId = req.params.id
      helper.deleteUser(proId).then((response)=>{
          console.log(response);
          console.log('sanoop');
          res.redirect('/admin/collections')
          
      })

  })

  router.get('/edit/:id',async (req,res)=>{
      let user = await helper.getusersDetails(req.params.id)
        console.log(user);
        res.render('edituser',{user})

  })
router.post('/edit/:id',(req,res)=>{
    helper.updateuser(req.params.id,req.body).then(()=>{
        res.redirect('/admin/collections') 
    })
})

router.post('/search',(req,res)=>{
    // console.log(req.body.name);
    helper.searchuser(req.body).then((response)=>{
      
        // res.render('sample')
        res.render('search',{admin:true,response})
        // res.render('search',{response})
    })  
})

router.get('/block/:id',(req,res)=>{

    console.log(req.params.id);
    helper.blockuser(req.params.id).then((ee)=>{
        console.log(ee);
        // user book and reload back login page
        req.session.login= false;
 
        res.redirect('/admin/collections')
    })
})

router.get('/unblock/:id',(req,res)=>{
    console.log(req.params.id);
    helper.unblockuser(req.params.id).then((ee)=>{
        console.log(ee);
        res.redirect('/admin/collections')
    })
    
})






module.exports = router;