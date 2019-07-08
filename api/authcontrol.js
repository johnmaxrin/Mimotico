 
const User=require('../models/masteruser'); 
var jwt=require('jsonwebtoken');
var keys=require('../config/keys')
var bcrypt = require('bcryptjs');
 


// Registration Validation!
function validation(req,res){
let errors=[];
const { email, username, password, rpassword } = req.body;

    if(!username || !email || !password || !rpassword)
    {
        errors.push('All Fields are Required!');
        
      
    }
    if(password!=rpassword)
    {
        errors.push('Passwords do not match!');
    }

    if(password.length<6)
    {
        errors.push('Password must be at least 6 characters!')
    }

    if(errors.length>0)
    {
        res.render('../views/auth/register',{errors});
    }

    else{
        User.findOne({email:email}).then(user=>{
            if(user){
                errors.push('Email already exist!');
                res.render('../views/auth/register',{errors});
            }
        })
    }

    if(errors.length===0)
    {
        User.findOne({username:username}).then(user=>{
            if(user){
                errors.push('Username already exist!');
                res.render('../views/auth/register',{errors});
    }

    else{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

     new User({
            username:username,
            email:email,
            password:hash
        }).save().then(user=>{
            res.redirect('/auth/login')
            console.log(user)
        }).catch(err=>{
            if(err) throw err
        });
    }
});

}
}




function loginauth(req,res)
{
    let errors=[];
    const password=req.body.password;
    const email=req.body.email;
    User.findOne({email:email}).then(user=>{
        if(user)
        {
            if(bcrypt.compareSync(password,user.password))
            {
                const token=jwt.sign({user},keys.secretkey,{expiresIn:600});
                req.session.token=token;
                req.session.user=user.username;
                console.log('From Control '+req.session.user)
                //res.send(req.session);
                res.redirect('/dashboard');
            }

            else{
                errors.push('Password Incorrect')
                res.render('../views/auth/login',{errors});
            }
        }

        else{
            errors.push('User not Registered')
            res.render('../views/auth/login',{errors});
        }

});

}


function removeall(){
    User.remove({},(err,resl)=>{
        console.log(resl)
    })
}


module.exports.removeall=removeall;
 module.exports.loginauth=loginauth;
 module.exports.validation=validation;