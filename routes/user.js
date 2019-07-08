const express=require('express')
const router=express.Router();
const auth=require('../api/authcontrol');


//Login
router.get('/login',(req,res)=>{
    res.render('../views/auth/login')
});

router.post('/login',(req,res)=>{
auth.loginauth(req,res);
}); 




// Register
router.get('/register',(req,res)=>{
    res.render('../views/auth/register')
});

router.post('/register',(req,res)=>{
    auth.validation(req,res);
});


//Logout
router.get('/logout',(req,res)=>{
    req.session.user=null;
    res.redirect('/auth/login')
})








// router.get('/remove',(req,res)=>{
//     auth.removeall();
// })

module.exports=router;